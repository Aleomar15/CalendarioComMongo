var appointment = require("../models/Appointment")
var mongoose = require("mongoose");
var AppointmentFactory = require("../factories/AppointmentFactory");

const Appo = mongoose.model("Appointment", appointment);


class AppointmentService{

    async Create(name,email, description, cpf, date, time, finished){
        var newAppo =  new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished
        });

        try {
            await newAppo.save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
       
    }

    async GetAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {

                if(appointment != undefined){
                    appointments.push(AppointmentFactory.Build(appointment) )
                }
            });

            return appointment;
        }
    }

}

module.exports = new AppointmentService();