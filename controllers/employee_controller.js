const Employee = require('../models/employees.js') ;


//show list of employees
const index =(req, res, next) => {
    Employee.find().then(
        response => {res.json({response})}).catch(err => {
            res.json({message:'An error occurred'})
    })
    

}

//show single employee
const show = (req, res, next) => {
    let employeeID= req.body.employeeID
    Employee.findById(employeeID).then(
        response => {res.json({response})}).catch(err => {
            res.json({message:'An error occurred'})
        })

}

//add new employee
const store = (req, res, next) => {
 let employee = new Employee({
    name:req.body.name,
    designation:req.body.designation,
    email:req.body.email,
    phone:req.body.phone,
    age:req.body.age,


 })
 employee.save().then(response =>{
    res.json({message:'Employee Added Successfully'})
    }).catch(error=>{
    res.json({
        message:'Failed to add employee'
    })
})

}

//update an employee
const update = (req, res, next) => {
let employeeID = req.body.employeeID;
let updatedData = {
    name:req.body.name,
    designation:req.body.designation,
    email:req.body.email,
    phone:req.body.phone,
    age:req.body.age,
}

Employee.findByIdAndUpdate(employeeID, {$set:updatedData})
.then(()=>{
    res.json({
        message:'Employee updated successfully'
    })
}).catch(error=>{
    res.json({
        message:'Update Failed'
    })
})
}

//delete an employee

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findOneAndRemove(employeeID).then(()=>{
        req.json({
            message:'Employee delete successfully'
        })
    }).catch(error=>{
        req.json({
            message:'Failed to delete employee'
        })
    })

}

module.exports = {
    index, show, store, update, destroy
}

