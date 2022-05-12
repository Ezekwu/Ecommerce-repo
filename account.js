//TOGGLE CREATEACCOUNT AND SIGN-IN 
const signInLink = document.querySelector('.sign-in__link');
const createAccountLink = document.querySelector('.create-account__link');
const createAccountForm = document.querySelector('.create__account');
const signInForm = document.querySelector('.Sign-in');
const passwordInput = document.querySelector('.password-validate');
const passwordInputSignIn = document.querySelector('.password-validate--sign-in')
const passwordDisplaySignIn = document.querySelector('.password-display--sign-in');
const hidePasswordSignIn = document.querySelector('.fa-eye--sign-in');
const showPasswordSignIn = document.querySelector('.fa-eye-slash--sign-in');
const emailInput = document.querySelector('.email-input');
const emailError = document.getElementById('email-error');
const passwordDisplaySignUp = document.querySelector('.password-display');
const hidePasswordSignUp = document.querySelector('.fa-eye');
const showPasswordSignUp = document.querySelector('.fa-eye-slash');




function toggleForm () {
    
    signInLink.addEventListener('click', (e) => {
        e.preventDefault();
        signInForm.classList.remove('hide-form');
        createAccountForm.classList.add('hide-form');
    });
    createAccountLink.addEventListener('click', (e) => {
        e.preventDefault();
        createAccountForm.classList.remove('hide-form');
        signInForm.classList.add('hide-form');
    })
}
toggleForm();

//FORM VALIDATIONS
const inputs = [...document.querySelectorAll('input')];


const regEx = {
    password : /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[^a-zA-z0-9])(?=.{8,100})/g,
    email : /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}
function validate (field, regex) {
    if(regex.test(field.value)){
        
        field.className = 'valid';
        field.classList.remove('invalid');
        setTimeout(()=>{
            field.classList.remove('valid');
        },2000)
        
    } else{

        field.className = 'invalid';
        field.classList.remove('valid')
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup',(e)=>{
        validate(e.target, regEx[e.target.attributes.name.value]);
        
    } )
})

const requirements = passwordInput.parentElement.nextElementSibling;

passwordInput.addEventListener('keyup',()=> {
    requirements.style.display = 'block';
    if(passwordInput.classList.contains('valid')){
        passwordInput.classList.remove('valid');
        passwordInput.parentElement.classList.add('valid');
        passwordInput.parentElement.classList.remove('invalid');
        setTimeout(()=>{
            passwordInput.parentElement.classList.remove('valid');
        },2000)
        requirements.style.display = 'none';
    } else if(passwordInput.classList.contains('invalid')){
        passwordInput.classList.remove('invalid');
        passwordInput.parentElement.classList.add('invalid');
        
    }
});


passwordDisplaySignUp.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-eye-slash')){
        e.target.style.display='none';
        hidePasswordSignUp.style.display='block';
        passwordInput.attributes.type.value ='type'
    }else if(e.target.classList.contains('fa-eye')){
        e.target.style.display='none';
        showPasswordSignUp.style.display='block';
        passwordInput.attributes.type.value ='password'
    }
})

passwordInputSignIn.addEventListener('keyup',()=> {
    passwordInputSignIn.classList.remove('valid')
    passwordInputSignIn.classList.remove('invalid')
});

passwordDisplaySignIn.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-eye-slash--sign-in')){
        e.target.style.display='none';
        hidePasswordSignIn.style.display='block';
        passwordInputSignIn.attributes.type.value ='type'
    }else if(e.target.classList.contains('fa-eye--sign-in')){
        e.target.style.display='none';
        showPasswordSignIn.style.display='block';
        passwordInputSignIn.attributes.type.value ='password'
    }
})
console.log(passwordInputSignIn);
emailInput.addEventListener('keyup', ()=>{
    emailError.style.display= 'block';
    if(emailInput.classList.contains('valid')){
        emailError.classList.contains('invalid')
        emailError.style.display= 'none';
    }
})

console.log(requirements);


