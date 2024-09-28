

const formContainer = document.querySelector(".form-container");
const form = document.getElementById("link-shortner-form");
const input = document.getElementById("link-shortner-input");


form.addEventListener("submit", function (e) {
  e.preventDefault();
  let number = input.value;
  let linkUrl = `https:wa/me/${number}`
  if (number !== "") {
    let area = document.createElement("div");
    area.className = "link-area";
    area.innerHTML = `
                <p>Your whatsApp link is:</p>
                <div class="link">
                    <h3>${linkUrl}</h3>
                    <span><i class="fa-solid fa-copy"></i></span>
                    <span class="tooltip">click to copy</span>
                </div>
        `;
    formContainer.appendChild(area);
    input.value = null;

    const link = document.querySelector(".link");
    link.addEventListener("click", function () {
      let linkText = document.querySelector(".link h3");
      navigator.clipboard.writeText(linkText.innerText);
      // alert('copied: ' + linkText.innerText )
      document.querySelector(".tooltip").innerHTML = "copied!";
      link.addEventListener("mouseout", function () {
        document.querySelector(".tooltip").innerHTML = "Click to copy";
      });
    });
  }
});



const customForm = document.getElementById("custom-link-shortner-form");
const textArea = document.getElementById("custom-link-shortner-text");
const customInput = document.getElementById("custom-link-shortner-number");

// CUSTOM FORM
customForm.addEventListener('submit', function(e){
    e.preventDefault();
    let number = customInput.value;
    const messageTyped= textArea.value
    messageUrl = encodeURIComponent(messageTyped)
   let url = `https://wa.me/${number}?text=${messageUrl}`

    if(number!=='' && messageTyped !== ''){
        let area = document.createElement("div");
        area.className = "link-area";
        area.innerHTML = `
                    <p>Your whatsApp link is:</p>
                    <div class="link">
                        <h3>${url}</h3>
                        <span><i class="fa-solid fa-copy"></i></span>
                        <span class="tooltip">click to copy</span>
                    </div>
            `;
        formContainer.appendChild(area);
        customInput.value = null;
        textArea.value = null

        const link = document.querySelector(".link");
        link.addEventListener("click", function () {
          let linkText = document.querySelector(".link h3");
          navigator.clipboard.writeText(linkText.innerText);
          // alert('copied: ' + linkText.innerText )
          document.querySelector(".tooltip").innerHTML = "copied!";
          link.addEventListener("mouseout", function () {
            document.querySelector(".tooltip").innerHTML = "Click to copy";
          });
        });
    }
})

let customBtn = document.querySelector('.custom-btn')

customBtn.addEventListener('click', function(){
    customBtn.innerHTML = customBtn.innerHTML == 'Generate from number?' ? 'Add custom message?' : 'Generate from number?'
    const form = document.getElementById("link-shortner-form");
    const customForm = document.getElementById("custom-link-shortner-form");
    const area = document.querySelector('.link-area')
    if(form.classList.contains('active')){
        form.classList.remove('active')
        customForm.classList.add('active')
        area.remove()

    }else{
        customForm.classList.remove('active')
        form.classList.add('active')
        area.remove()
    }
    
})

document.querySelector('.sharebtn').addEventListener('click', async function(){
    let url = document.querySelector('.link h3')
    let sharedUrl = url.innerHTML
    
    if (navigator.share) {
        try {
          await navigator.share({
            title: 'WhatsApp link',
            text: sharedUrl,
          });
          console.log('Content shared successfully');
        } catch (error) {
          console.error('Error sharing content:', error);
        }
      } else {
        console.error('Web Share API is not supported in your browser.');
      }

})