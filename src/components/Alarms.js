import React from 'react'

export default function Alarms(alarm, setAlarm, HandleAlarm) {
    console.log(alarm.alarm);
    if(alarm.alarm === "1") {
        // setTimeout(function(){handleAlarm("2");}, 5000);
        return (
            <div className='w-full py-3 text-center bg-green-400 text-white rounded'>
                아이템이 추가되었습니다.
            </div>
        )
    }
    else if(alarm.alarm === "2") {
        return (
            <div className='w-full py-3 text-center bg-green-400 text-white rounded'>
                아이템이 수정되었습니다.
            </div>
        )
    }
    else if(alarm.alarm === "3") {
        return (
            <div className='w-full py-3 text-center bg-red-400 text-white rounded'>
                아이템이 삭제되었습니다.
            </div>
        )
    }
    else if(alarm.alarm === "4") {
        return (
            <div className='w-full py-3 text-center bg-red-400 text-white rounded'>
                아이템이 전부 삭제되었습니다.
            </div>
        )
    }
    else {
        // setTimeout(function(){setAlarm("4")}, 5000 );
        // console.log("알람실행");
        return (<div></div>
        )
    }
}
