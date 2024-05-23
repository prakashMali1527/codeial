const queue = require('../config/kue');
const InactiveAccount = require('../models/inactive_account');
const User = require('../models/user');
const express = require('express');
const router =

    queue.process('removeInactiveAccount', async function (job, done) {

        try {
            let inactiveAccount = await InactiveAccount.findById(job.data._id);

            if (inactiveAccount) {
                if (inactiveAccount.isActive == false) {
                    // delete account if user has not activated account 
                    await User.deleteOne({ _id: inactiveAccount.user });

                    // also delete dummy inactive Account
                    await InactiveAccount.deleteOne({ _id: inactiveAccount._id });

                    console.log('removed inactive account');
                }else{
                    console.log('Account already activated!');
                }
            } else {
                console.log('Account already deleted!');
            }
        } catch (err) {
            console.log('Server error in deleting inactive account from delayed queue', err);
        }
        done();
    });