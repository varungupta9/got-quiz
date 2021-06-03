var button =document.getElementById('button')
button.addEventListener('click',()=>showquiz())
var address = "https://game-of-thrones-quotes.herokuapp.com/v1/random/5"

// Get the button that opens the modal
var btn = document.getElementById("check");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to display Quiz
async function showquiz(){
    try {
        var res = await fetch(address)
        var result = await res.json()
        let head = document.getElementById('heading')
        let subhead = document.getElementById('heading2')
        head.style.display='none'
        subhead.style.display='none'
        for(let i =0 ; i < result.length;i++)
        {
            let question = result[i].sentence
            let sendValue = i
            console.log("Answer "+result[i].character.name)
            showQ(sendValue,question) 
        }
        let check = document.getElementById('check')
        let home = document.getElementById('home')
        check.style.display='block'
        home.style.display='block'

        home.addEventListener('click',toHome)
                
        check.addEventListener('click',()=>checkAns())
        
        //Function to check answers and display on modal
        function checkAns(){
            var modalContent = document.getElementById("modal-content")
            modalContent.innerHTML=""
            let count =0
            let v1 = result[0].character.name
            let v2 = result[1].character.name
            let v3 = result[2].character.name
            let v4 = result[3].character.name
            let v5 = result[4].character.name
            document.getElementById('0').value.toLowerCase()==v1.toLowerCase()?count++:count;
            document.getElementById('1').value.toLowerCase()==v2.toLowerCase()?count++:count;
            document.getElementById('2').value.toLowerCase()==v3.toLowerCase()?count++:count;
            document.getElementById('3').value.toLowerCase()==v4.toLowerCase()?count++:count;
            document.getElementById('4').value.toLowerCase()==v5.toLowerCase()?count++:count;
            var modal = document.getElementById("modal")
            modal.style.display = "block";
            let span = document.createElement('span')
            span.setAttribute('class','close')
            span.innerHTML="&times"
            span.addEventListener('click',onClickClose)
            let h2 = document.createElement('h2')
            let h5 = document.createElement('h5')
            if(count===5){
                h2.innerHTML="CONGRATULTIONS!!!" 
                h5.innerHTML="You get the throne"
            }
            else{
                h2.innerHTML="You have got "+count+"/5 answers right" 
                h5.innerHTML="Argh!! Try again to get the throne"
            }
            
            modalContent.append(span,h2,h5)

        }
      //function to close modal
        function onClickClose () {
            modal.style.display = "none";
          }
        //function to return to home  
        function toHome()
        {
           location.reload()
        }  
        // Create Questions Dynamically
        function showQ(forValue,question){
            let form = document.getElementById('form')   
            let label = document.createElement('label')
            label.setAttribute('for',forValue)
            label.innerHTML="Question:"+" "+question
            let input = document.createElement('input')
            input.setAttribute('type','text-box')
            input.setAttribute('id',forValue)
            input.setAttribute('placeholder','Answer')
            form.append(label,input)     

        }
        
    } catch (error) {
        console.log(error)
    }
}
