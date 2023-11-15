import React, {useState, useCallback} from 'react';
import "./App.css";
import Lists from './components/Lists';
import Form from './components/Form';
import Alarms from './components/Alarms';

const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const [alarm, setAlarm] = useState("0");
  let timeOutRef = React.useRef();

  const [sumAll, setSumAll] = useState(0);

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    handleAlarm("3");
  },[todoData]);

  const handleEditClick = useCallback((id) => {
    let newTodoData = todoData.map((data) => {
      if(data.id === id) {
        setIsEditing(id);
        setValue(data.title);
        setPriceValue(data.price);
      }
    });
  });

  //수정하는 함수
  const handleEdit = (e) => {
    e.preventDefault();
    if(value === "") return;
    if(priceValue==="") return;

    let newTodoData = todoData.map((data) => {
      if(data.id === isEditing) {
        data.title = value;
        data.price = priceValue;
      }
      return data;
    })
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    setIsEditing("");

    //입력칸 글씨 지우기
    setValue("");
    setPriceValue("");
    handleAlarm("2");
  }

  const handleSubmit = (e) => {
    //페이지 리로드 막아줌
    e.preventDefault();
    if(value === "") return;
    if(priceValue==="") return;

    let newTodo = {
      id: Date.now(),
      title: value,
      price: priceValue,
    };
    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

    //입력칸 글씨 지우기
    setValue("");
    setPriceValue("");
    handleAlarm("1");
  }

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
    // setSumAll(0);
    handleAlarm("4");
  }

  React.useEffect(() => {
    return () => {
      // 컴포넌트 unmount 시 타이머 정리
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  function handleAlarm(alarm) {
    // 이전 타이머 정리
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    setAlarm(alarm);
    
    // 새로운 타이머 설정
    timeOutRef.current = setTimeout(function() {
      setAlarm("0");
    }, 5000);
  }

  // 모든 비용 총합 계산
  React.useEffect(() => {
    setSumAll(sumTodo(todoData));
  }, [todoData]);

  function sumTodo(todoData) {
    return todoData.reduce((sum, data) => sum + parseInt(data.price, 10), 0);
  }
  // function sumTodo(todoData) {
  //   let sum = 0;
  //   todoData.map((data) => {
  //     sum += parseInt(data.price, 10);
  //   })
  //   return sum;
  // }
  
  return(
    <div className='flex flex-col w-screen h-screen bg-green-100 px-5 py-5'>
      <Alarms alarm={alarm} setAlarm={setAlarm} handleAlarm={handleAlarm}></Alarms>
      <h1 className='text-2xl font-bold my-3'>예산 계산기</h1>
      <div className='flex flex-col p-6 bg-white rounded'>
        <div className='flex mb-3'>
          <div className='w-full'>
            <Form handleSubmit={handleSubmit} handleEdit={handleEdit} value={value} setValue={setValue} priceValue={priceValue} setPriceValue={setPriceValue} isEditing={isEditing}/>
          </div>
        </div>
        <Lists handleClick={handleClick} handleEditClick={handleEditClick} todoData={todoData} setTodoData={setTodoData} handleAlarm={handleAlarm} isEditing={isEditing} setIsEditing={setIsEditing}/>
        <button className=' bg-green-600 rounded text-white py-2 w-3/12 hover:bg-green-400 hover:scale-105' onClick={handleRemoveClick}>목록 지우기</button></div>
      <h1 className='mt-3 text-right text-2xl'>총지출 : {sumAll}원</h1>
      </div>
  );
}