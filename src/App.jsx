import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import fullLogo from '/Full.png'

function App() {

  // FOR MANIFEST APP
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }


  const componentPDF = useRef();
  const DownloadPDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Facture",
  });

  let [infos, setinfos] = useState({
    total: '',
    quantity: '',
  })

  let [clientInfo, setclientInfo] = useState({
    fname: '',
    lname: '',
    dateFacture: '',
    garantie: '0',
  })

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setclientInfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })

    setinfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  let spanTTC = infos.total * infos.quantity;

  const LocalStorageFacturesNumber = () => {
    localStorage.setItem("FNumber", +localStorage.getItem("FNumber") + 1)
  }

  const AddProduct = () => {

    // Table
    let table = document.getElementById('table');

    // inputs values
    let product = document.getElementById('product')
    let price = document.getElementById('price')
    let quantité = document.getElementById('quantité')

    // Create td elements
    let a = document.createElement('td')
    let z = document.createElement('td')
    let e = document.createElement('td')
    let r = document.createElement('td')
    let t = document.createElement('td')

    //  Create tr element
    let Principal = document.createElement('tr')
    let counter = 0;
    Principal.id = "principal" + ++counter; // append new ID every time
    table.appendChild(Principal);


    // Set tr elements values
    a.innerHTML = product.value;
    z.innerHTML = quantité.value;
    e.innerHTML = price.value + " Dhs";
    r.innerHTML = "0 Dhs";
    t.innerHTML = spanTTC;

    // Append td elements In tr elements id
    Principal.appendChild(a)
    Principal.appendChild(z)
    Principal.appendChild(e)
    Principal.appendChild(r)
    Principal.appendChild(t).setAttribute("id", "ttcValue");

    let ttc = document.querySelectorAll('#ttcValue');
    var sum = 0;

    ttc.forEach(function (ttcs) {
      var number = parseFloat(ttcs.innerHTML);
      if (!isNaN(number)) {
        sum += number;
      }
    });

    // Final HT, TTC PRICES SPAN
    let FinalHT = document.getElementById('FinalHT');
    let FinalTTC = document.getElementById('FinalTTC');
    FinalHT.innerHTML = sum + " Dhs";
    FinalTTC.innerHTML = sum + " Dhs";
  }

  // TODAY'S DATE BUTTON
  const todayDate = () => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    let dateFacture = document.getElementById('dateFacture');
    var formattedDay = (day < 10 ? '0' : '') + day;
    var formattedMonth = (month < 10 ? '0' : '') + month;
    var shortDate = " " + formattedMonth + '/' + formattedDay + '/' + year;

    dateFacture.innerHTML = shortDate
  }

  // Styles
  const inputStyle = 'border rounded-lg py-1 px-4 focus:outline-secondary duration-300 mx-4';
  const hStyle = 'font-semibold';
  const priceStyle = 'text-start w-20 font-semibold '

  return (
    <div className='mx-10 my-5'>
      <nav>
        <img src={fullLogo} className='h-8 mb-5' />
      </nav>
      <div>
        <form className='border-y  -sm:grid-cols-2 -lg:grid-cols-3 grid-cols-azz py-5 grid'>
          <label>
            Date de la facture :
            <input
              type='date'
              name='dateFacture'
              onChange={handleChange}
              className={inputStyle} />
          </label>
          <div onClick={todayDate} className='cursor-pointer ml-10 w-max bg-secondary rounded-lg px-5 py-1 hover:bg-primary text-white duration-300'>Today's date</div>
          <label>
            Nom Complet:
            <input
              type='text'
              name='nom'
              onChange={handleChange}
              className={inputStyle} />
          </label>
          <label>
            Address :
            <input
              type='text'
              name='address'
              onChange={handleChange}
              className={inputStyle} />
          </label>
          <label>
            Garantie :
            <input
              type='number'
              name='garantie'
              onChange={handleChange}
              className={inputStyle} />
          </label>
        </form>
        <div className='border-b py-5'>
          <label>
            Produit :
            <input type="text" className={inputStyle} id='product' />
          </label>
          <label>
            Quantité :
            <input type="number" id='quantité' onChange={handleChange} name='quantity' className={inputStyle + " w-[5rem] appearance-none pr-1"} min={0} max={5} />
          </label>
          <label>
            Prix unitaire	 :
            <input type="text" id='price' onChange={handleChange} name='total' className={inputStyle + " w-[8rem]"} />
          </label>
          <label>
            Total TTC :
            <span className={inputStyle} id='spanTotalTtc'>{spanTTC} Dhs</span>
          </label>
          <button onClick={AddProduct} className='ml-10 w-max bg-secondary rounded-lg px-5 py-1 hover:bg-primary text-white duration-300'>Add</button>
        </div>
      </div>

      <div ref={componentPDF} className='block mx-auto p-5 border'>
        <div className='flex items-center justify-between mx-5'>
          <img src={fullLogo} className='h-10' />
          <h1 className='text-xl font-bold'>Facture No. <span>{localStorage.getItem('FNumber')}</span></h1>
        </div>
        <div className='my-10 text-center p-5'>
          <h1 className={hStyle}>
            Date de la facture :
            <span id='dateFacture'> {clientInfo.dateFacture}</span>
          </h1>
          <h1 className={hStyle}>
            Address :
            <span> {clientInfo.address}</span>
          </h1>
          <h1 className={hStyle}>
            Nom Complet :
            <span> {clientInfo.nom}</span>
          </h1>
        </div>
        <div>
          <h1 className={hStyle}>Info additionelles :</h1>
          <h1>Merci d'avoir choisi PC's World pour nos services.</h1>
          <h1>
            Service Aprés Vente :
            <span> Garantie {clientInfo.garantie} Mois</span>
          </h1>
        </div>
        <div className='my-10'>
          <table>
            <thead>
              <tr>
                <th>Produits</th>
                <th>Quantités</th>
                <th>Prix unitaire</th>
                <th>TVA</th>
                <th>TOTAL TTC (Dhs)</th>
              </tr>
            </thead>
            <tbody id='table' >
            </tbody>
          </table>
        </div>
        <div>
          <div className='flex justify-end'>
            <h1 className={priceStyle}>Total HT</h1><span className='w-20 text-end ml-20' id='FinalHT'></span>
          </div>
          <div className='flex justify-end'>
            <h1 className={priceStyle}>TVA</h1><span className='w-20 text-end ml-20'>0 Dhs</span>
          </div>
          <div className='flex justify-end border-t w-max ml-auto py-2 my-2'>
            <h1 className={" text-lg font-bold " + priceStyle}>Total TTC</h1><span id='FinalTTC' className='w-20 text-end ml-20 font-bold'>Dhs</span>
          </div>
        </div>
      </div>
      <button onClick={() => {
        DownloadPDF();
        LocalStorageFacturesNumber();
      }}
        className='bg-secondary rounded-lg px-5 text-lg font-semibold py-1 hover:bg-primary hover:text-white duration-300 block w-max mx-auto my-5' >
        Downlaod Facture
      </button>
      <p className='text-center mt-20'>Made With 🖤 by Zakaryae Ennaciri . </p>
      <p className='text-center mb-5'>©2023 Pc's World</p>
    </div>
  )
}
export default App;