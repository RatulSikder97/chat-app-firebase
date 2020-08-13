let msgInput = document.getElementById("msg-text");
let msgForm  = document.getElementById('msg-form');
let msgText  = document.getElementById('msg-text');
let msgList  = document.getElementById('msg-list');

let user = sessionStorage.getItem('name');

function gotoBottom(id){
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
 }


if(user == null){
    const name = prompt("What is your name??");
    sessionStorage.setItem('name',name);
    user = sessionStorage.getItem('name');

}
// db.collection("messages")
// .orderBy("timestamp", "asc").onSnapshot(snapshot => { 
   
//     snapshot.docs.forEach(doc=>{
//         let data = doc.data();
//         if (data.name == name) {
//             render(data.message, 'send-msg')
//         } else {
//             render(data.message, 'receive-msg')
//         }
//         });
// });

window.onload=  function(){
    db.collection('messages').orderBy("timestamp","asc").onSnapshot((snapshot)=>{
        let change = snapshot.docChanges();
        change.forEach( cn=>{
            if(cn.type =='added'){
                // console.log(cn.doc.data());
                let data = cn.doc.data();
                
                if (data.name == user) {
                        render(data.message, 'send-msg')
                    } else {
                        render(data.message, 'receive-msg')
                    }    
            }
            
        });
       gotoBottom('msg-list'); 
    });
   

    msgForm.addEventListener('submit',e=>{
        e.preventDefault();
        let message = msgText.value;
        if(message !=""){
            
            db.collection("messages").add({
                'name'      : user,
                'message'   : message,
                'timestamp' : firebase.firestore.FieldValue.serverTimestamp()
            }) 
            msgText.value = '';    
        }
        
    });

}


function render(msg,type){
    let li = document.createElement('li');
    li.innerText = msg;
    li.setAttribute('class',type);
    msgList.appendChild(li);
}