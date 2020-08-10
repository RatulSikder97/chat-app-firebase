let ul = document.getElementById("cafe-list");
let form = document.getElementById('add-cafe-form')
// Create element
function render(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = "X";
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    ul.appendChild(li)

    cross.addEventListener('click', e=>{
        e.stopPropagation();

        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete();
    })
}
// db.collection('cafe').where('city','>','D').get().then((snap)=>{
//     snap.docs.forEach(doc => {
//         render(doc);
//     });
// })


//set data
form.addEventListener('submit', e =>{
    e.preventDefault();

    db.collection('cafe').add({
        "name" : form.name.value,
        "city" : form.city.value
    });

    form.name.value ='';
    form.city.value ='';
});

// Real time data
db.collection('cafe').orderBy('name').onSnapshot(snap=>{
   let cng = snap.docChanges();
console.log(cng);
   cng.forEach( cn => {
      if(cn.type =='added'){
          render(cn.doc);
      }else if( cn.type =='removed'){
       
          let li = ul.querySelector('[data-id='+cn.doc.id+']');
          ul.removeChild(li);
      }
   });
});