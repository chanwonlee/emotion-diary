import { Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit.jsx';
import NotFound from './pages/NotFound';

const supabaseUrl = 'https://eufcgtseynxtmuauogqg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: storedData, error } = await supabase.from('emotion').select('*');
        if (error || !storedData) {
          setIsLoading(false);
          return;
        }

        let maxId = 0;
        storedData.forEach((item) => {
          if (Number(item.id) > maxId) {
            maxId = item.id;
          }
        });

        idRef.current = maxId + 1;

        dispatch({ type: 'INIT', data: storedData });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const onCreate = async (createdDate, emotionId, content) => {
    const newItem = {
      id: idRef.current++,
      createdDate,
      emotionId,
      content
    };

    const { error } = await supabase.from('emotion').insert([newItem]);
    if (!error) {
      dispatch({ type: 'CREATE', data: newItem });
    }
  };

  const onUpdate = async (id, createdDate, emotionId, content) => {
    const updatedItem = {
      id,
      createdDate,
      emotionId,
      content,
    };

    const { error } = await supabase
      .from('emotion')
      .update(updatedItem)
      .eq('id', id);
    if (!error) {
      dispatch({ type: 'UPDATE', data: updatedItem });
    }
  };

  const onDelete = async (id) => {
    const { error } = await supabase.from('emotion').delete().eq('id', id);
    if (!error) {
      dispatch({ type: 'DELETE', id });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;