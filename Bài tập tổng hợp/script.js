let studentList = [
  ["sv01", "duc", "123@gmail.com", "0987654321", "japan", "male"],
];
let action = "create";

function renderData() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < studentList.length; i++) {
    tbody.innerHTML += `<tr>
    <td>${i + 1}</td>
    <td>${studentList[i][0]}</td>
    <td>${studentList[i][1]}</td>
    <td>${studentList[i][2]}</td>
    <td>${studentList[i][3]}</td>
    <td>${studentList[i][4]}</td>
    <td>${studentList[i][5]}</td>
    <td>
      <button onclick="editStudent('${studentList[i][0]}')">edit</button>
      <button onclick="deleteStudent('${studentList[i][0]}')">delete</button>
    </td>
    </tr>`;
  }
}

function validateForm() {
  let studentId = document.getElementById("studentid").value;
  let studentName = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let sex = document.querySelector("input[name='sex']:checked").value;

  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (studentId == "") {
    alert("vui lòng nhập ID");
    return false;
  }
  if (studentName == "") {
    alert("vui lòng nhập Name");
    return false;
  }
  if (address == "") {
    alert("vui lòng nhập address");
    return false;
  }
  if (!email.match(emailPattern)) {
    alert("vui lòng nhập đúng định dạng email");
    return false;
  }
  if (!phone.match(phonePattern)) {
    alert("vui lòng nhập đúng định dạng phone");
    return false;
  }
  return true;
}
function createOrEdit() {
  if (validateForm()) {
    let studentId = document.getElementById("studentid").value;
    let studentName = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.querySelector("input[name='sex']:checked").value;
    if (action == "create") {
      studentList.push([studentId, studentName, email, phone, address, sex]);
    } else {
      let index = getStudentByStudentId(studentId);
      document.getElementById("studentid").readOnly = false;
      studentList[index][1] = studentName;
      studentList[index][2] = email;
      studentList[index][3] = phone;
      studentList[index][4] = address;
      studentList[index][5] = sex;
    }
    document.getElementById("studentid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("male").checked = true;
    renderData();
  }
}
function getStudentByStudentId(studentId) {
  for (let i = 0; i < studentList.length; i++) {
    if (studentId == studentList[i][0]) {
      return i;
    }
  }
  return -1;
}
function editStudent(studentId) {
  let index = getStudentByStudentId(studentId);
  if (index >= 0) {
    document.getElementById("studentid").value = studentList[index][0];
    document.getElementById("name").value = studentList[index][1];
    document.getElementById("email").value = studentList[index][2];
    document.getElementById("phone").value = studentList[index][3];
    document.getElementById("address").value = studentList[index][4];
    if (studentList[index][5] == "male") {
      document.getElementById("male").checked = true;
    } else {
      document.getElementById("female").checked = true;
    }
    action = "edit";
    document.getElementById("studentid").readOnly = true;
  }
}
function deleteStudent(studentId) {
  let index = getStudentByStudentId(studentId);
  studentList.splice(index, 1);
  renderData();
}
window.onload = renderData();

let btnSave = document.getElementById("btnsave");
btnSave.addEventListener("click", function (event) {
  event.preventDefault();
  createOrEdit();
});
