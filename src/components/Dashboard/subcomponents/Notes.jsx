import { useEffect, useState } from 'react';
import styles from '../dashboard.module.css'


export default function Notes(){
    const [text, setText] = useState('');
    useEffect(()=>{
      localStorage.setItem("notes",text);
    },[text])
    return(
      <div className={styles.notes}>
        <h2>All Notes</h2>
          <textarea onChange={(e)=>setText(e.target.value)} cols="38" rows="18">This is how I am going to learn MERN Stack in next 3 months.</textarea>
      </div>
    )
  }