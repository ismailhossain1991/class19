//get Elements
const skills = document.querySelector('#skill_list');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_edit_form = document.querySelector('#devs_edit_form');
const devs_data_list = document.querySelector('#devs_data_list');
const devs_edit_btns = document.querySelectorAll('devs_edit_btn');


const loadSkills = () => {



axios.get('http://localhost:5050/skill/').then(data => {

    let skill_list = '';
    data.data.map(skill => {
    skill_list += `
 <option value="${skill.id}">${skill.name}</option>
        `;
    });
    skills.insertAdjacentHTML('beforeend', skill_list);
});

}
loadSkills();

/**
 * Add Developer
 */

const getDevelopers = () =>{

axios.get('http://localhost:5050/developers').then( res => {
let dev_data = '';
res.data.map((dev, index) => {
    dev_data += `
    <tr>
    <td>${index + 1}</td>
    <td>${ dev.name }</td>
    <td>${ dev.email }</td>
    <td><img style="object-fit:cover; width:50px; height:50px;" src="${ dev.photo }" alt=""></td>
    <td>
       <a data-bs-toggle="modal" class="btn btn-info btn-sm" href="#modal_view"><i class="fa fa-eye"></i></a> 
       <a data-bs-toggle="modal" class="btn btn-warning btn-sm" onclick="editDeveloper(${ dev.id})" href="#modal_edit"><i class="fa fa-edit"></i></a> 
       <a data-bs-toggle="modal" class="btn btn-danger btn-sm" href="#modal_delete"><i class="fa fa-trash"></i></a> 
    </td>
   </tr>
    
    `;
});

devs_data_list.innerHTML = dev_data;
});
}

getDevelopers();
/**
 * Add devs
 */

 devs_add_form.addEventListener('submit', function(e){
e.preventDefault();

let name = this.querySelector('#name');
let email = this.querySelector('#email');
let photo = this.querySelector('#photo');
let skill = this.querySelector('#skill_list');

if(name.value == '' || email.value == '' || skill.value == ''){
alert('All fields are required');
}else{

    axios.post('http://localhost:5050/developers', {
       id   : "",
       name : name.value,
       email : email.value,
       photo : photo.value,
       skillId : skill.value 
    }).then( res => {
    name.value = '';
    email.value = '';
    photo.value = '';
    skill.value = '';

    getDevelopers();
    });


}

 });

 function editDeveloper(id){
 
    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let photo = document.getElementById('ephoto');
    let skill = document.getElementById('eskill_list');
    let preview = document.getElementById('epreview');
    let edit_id = document.getElementById('edit_id');

    axios.get(`http://localhost:5050/developers/${id}`).then( res => {

    name.value = res.data.name;
    email.value = res.data.email;
    email.value = res.data.email;
    skill.value = res.data.skillId;
    edit_id.value = id;
    preview.setAttribute('src', res.data.photo);
    });
 }

 devs_edit_form.addEventListener('submit', function(e){
e.preventDefault();

let name = this.querySelector('#ename');
let email = this.querySelector('#eemail');
let photo = this.querySelector('#ephoto');
let skill = this.querySelector('#eskill_list');
let edit_id = this.querySelector('#edit_id');

axios.patch(`http://localhost:5050/developers/${edit_id.value}`, {
    id   : "",
    name : name.value,
    email : email.value,
    photo : photo.value,
    skillId : skill.value 

}).then( res => {
   
    name.value = '';
    email.value = '';
    photo.value = '';
    skill.value = '';

getDevelopers();

});


 });