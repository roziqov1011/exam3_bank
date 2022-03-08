import { useEffect,useState } from 'react';
import './App.css';
import cr from './assets/img/create.png'
import re from './assets/img/read.png'
import up from './assets/img/update.png'
import de from './assets/img/delete.png'
import bank2 from './assets/img/bank2.png'
import haridor from './assets/img/haridor.png'
const PORT =  'https://exam3server.herokuapp.com';

function App() {
  const [creditorr, setCreditor] = useState([])
  const [bank, setBank] = useState([])
  const [createBank, setCreateBank] = useState([])
  const [createType, setCreateType] = useState([])
  useEffect(()=>{
     fetch(`${PORT}/creditorder`)
    .then(res => res.json())
    .then(data => setCreditor(data))
  },[])
  useEffect(()=>{
    fetch( `${PORT}/banks`)
    .then(res => res.json())
    .then(data => setBank(data))
  },[createBank])


const handlePost = (e)=>{
  e.preventDefault()
  const bank = e.target.elements.bank.value;
  const btype = e.target.elements.type.value;
  const bfoiz = e.target.elements.foiz.value;
  fetch( `${PORT}/banks`,{
    method: "post",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({bank, btype,bfoiz})
  })
  .then(res => res.json())
  .then(data => console.log(data))
  setCreateBank(bank)

}
const handlePut = (e)=>{
  e.preventDefault()
  const bank = e.target.elements.bank.value;
  const btype = e.target.elements.type.value;
  const bId = e.target.elements.id.value;
  const bfoiz = e.target.elements.foiz.value;
  fetch( `${PORT}/banks`,{
    method: "put",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({bId,bank, btype,bfoiz})
  })
  .then(res => res.json())
  .then(data => console.log(data))
  setCreateBank(bank)

}
const handleDelet = (e)=>{
  e.preventDefault()
  const bId = e.target.elements.id.value;
  fetch( `${PORT}/banks`,{
    method: "delete",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({bId})
  })
  .then(res => res.json())
  .then(data => console.log(data))
  setCreateBank(bId)

}



const bonkShow  = ()=>{
  document.querySelector('.bank-wrapper').style.display = 'flex'
  document.querySelector('.client').style.display = 'none'
} 
const clientShow  = ()=>{
  document.querySelector('.bank-wrapper').style.display = 'none'
  document.querySelector('.client').style.display = 'block'
} 
const crFuc = ()=>{
  document.querySelector('.form-post').style.display = 'block'
  document.querySelector('.bank').style.display = 'none'
  document.querySelector('.form-put').style.display = 'none'
  document.querySelector('.form-delete').style.display = 'none'
}
const reFuc = ()=>{
  document.querySelector('.form-post').style.display = 'none'
  document.querySelector('.bank').style.display = 'block '
  document.querySelector('.form-put').style.display = 'none'
  document.querySelector('.form-delete').style.display = 'none'
}
const upFuc = ()=>{
  document.querySelector('.form-post').style.display = 'none'
  document.querySelector('.bank').style.display = 'none '
  document.querySelector('.form-put').style.display = 'block'
  document.querySelector('.form-delete').style.display = 'none'
}
const deFuc = ()=>{
  document.querySelector('.form-post').style.display = 'none'
  document.querySelector('.bank').style.display = 'none '
  document.querySelector('.form-put').style.display = 'none'
  document.querySelector('.form-delete').style.display = 'block'
}
const {creditorder} = creditorr
const {creditorderSum} = creditorr
let foundSum = 0
if(creditorderSum){
  foundSum = creditorderSum[0].sum
}
const {creditordertype} = createType
const bankType =(e)=>{
  fetch( `${PORT}/creditorder?type=${e.target.value}`)
    .then(res => res.json())
    .then(data => setCreateType(data))

}
return (
<div className='wrapper'>

   <div className='inner'>
     <button onClick={bonkShow}><img src={bank2} alt="" /></button>
     <button onClick={clientShow}><img src={haridor} alt="" /></button>
   </div>
  <div className="bank-wrapper">
      <div className='button-wrapper'>
        <button onClick={crFuc} className='cr'><img src={cr} alt="" /></button>
        <button onClick={reFuc} className='re'><img src={re} alt="" /></button>
        <button onClick={upFuc} className='up'><img src={up} alt="" /></button>
        <button onClick={deFuc} className='de'><img src={de} alt="" /></button>
      </div>
    <div>
    <form className='form form-post' action="/" onSubmit={handlePost}>
        <h3>New bank created</h3>
        <input name='bank' type="text" placeholder='Name' required/>
        <input name='type' type="number" placeholder='Year ' required/>
        <input name='foiz' type="number" placeholder='% ' required/>
        <button type='submit'>Add</button>
      </form>

      <form className='form form-delete ' action="/" onSubmit={handleDelet}>
        <h3>Bank Delete</h3>
        <input name='id' type="number" placeholder='Bank id' required/>
        <button type='submit'>Delete</button>
      </form>
      <form className='form form-put' action="/" onSubmit={handlePut}>
        <h3>Bank change</h3>
        <input name='id' type="number" placeholder='Bank id' required/>
        <input name='bank' type="text" placeholder='Change name' required/>
        <input name='type' type="number" placeholder='Change year' required/>
        <input name='foiz' type="number" placeholder='%' required/>
        <button type='submit'>Change</button>
      </form>
      <table className='bank'>
        <thead>
          <tr>
            <th>#</th>
            <th>Bank name</th>
            <th>Year</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {bank && bank.map((e,i)=>(
          <tr key={i}>
            <td>{e.bank_id}</td>
            <td>{e.bank_name}</td>
            <td>{e.bank_type} yilga beriladi</td>
            <td>yillik {e.bank_foiz} %</td>
          </tr>
          ))}
        </tbody>
      </table>  
    </div>
  </div>

  <div className="client">
    <h2 className='client-title'>Banklar hizmatidan foydalangan haridorlar</h2>

 <div className='inner-client'>
 <table >
    <thead>
      <tr>
        <th>Client</th>
        <th>Contact</th>
        <th>Bank</th>
        <th>Year</th>
        <th>Kridit</th>
      </tr>
    </thead>
    <tbody>
      {creditorder && creditorder.map((e,i)=>(
        <tr key={i}>
          <td>{e.client_name}</td>
          <td>{e.client_phone}</td>
          <td>{e.bank_name}</td>
          <td>{e.bank_type } yilga</td>
          <td>{e.bank_credit} s'om</td>
      </tr>
      ))}
    </tbody>
  </table>
  <div className="calc-client">
    <h2>Kridit calculator</h2>
      <p className='umumiy-kridit'><mark>{foundSum}</mark> so'm | umumiy berilgan kridit </p>
        <p>Bir dona bank qancha kridit bergan</p>
        <select onChange={bankType} id="">
          <option value="bank">bank</option>
          {
            bank && bank.map((e,i) =>(
              <option key={i} value={e.bank_type}>{e.bank_name}</option>
            ))
          }  
        </select>
        {
          creditordertype && creditordertype.map((e,i)=>(
            <p key={i}><mark>{e.sum}</mark> so'm</p>
          ))
        }
  </div>
 </div>
  </div>
</div>
);
}

export default App;