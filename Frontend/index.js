import express from "express";
import bodyParser from "body-parser";
import expressLayouts from 'express-ejs-layouts';
import axios from "axios";

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Use expressLayouts middleware
app.use(expressLayouts);

app.get("/", (req, res) => {
    res.render("login", { layout: "./layout" });
});

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await axios.post('http://localhost:3000/api/auth/signin', {
            email,
            password
        });
        const data = response.data;
        console.log(data);
        let currentUser = data;

        if (data.role == 'Manager') {
            console.log(currentUser);
            // order numbers
            try {
                const orderCountResponse = await axios.get(
                    'http://localhost:3000/api/orders/orderCount',
                    {
                        headers: {
                            Authorization: `${currentUser.accessToken}`
                        }
                    }
                );
                currentUser.totalOrderCount = orderCountResponse.data.data
            } catch (error) {
                console.log("Error in fetching order count:", error);
            }
        //chef numbers
        try {
            const chefCountResponse = await axios.get(
                'http://localhost:3000/api/employees/chefCount',
                {
                    headers: {
                        Authorization: `${currentUser.accessToken}`,
                        userRole: currentUser.role
                    },
                    
                    

                    
                }
            );
            //  console.log(chefCountResponse.data[0]['COUNT(*)'])
            currentUser.totalchefCount = chefCountResponse.data[0]['COUNT(*)']


        } catch (error) {
            console.log("Error in fetching order count:", error);
        }
        //  console.log(currentUser)
        //reservation count
        try {
            const ReservationCountResponse = await axios.get(
                'http://localhost:3000/api/reservations/reserveCount',
                {
                    headers: {
                        Authorization: `${currentUser.accessToken}`
                    }
                }
            );
            // console.log(ReservationCountResponse.data['COUNT(*)'])
            currentUser.reservationCount = ReservationCountResponse.data['COUNT(*)']
        } catch (error) {
            console.log("Error in fetching order count:", error);
        }
//all rem stats
try {
    const managerStats = await axios.get(
        'http://localhost:3000/api/employees/managerStats',
        {
            headers: {
                Authorization: `${currentUser.accessToken}`,
                userRole: currentUser.role
            },
            
            

            
        }
    );
     console.log(managerStats.data)
    
     currentUser.serverCount=managerStats.data.ServerCount
     currentUser.managerCount=managerStats.data.managerCount
     currentUser.tableCount=managerStats.data.tableCount
     console.log(currentUser)
    // currentUser.totalchefCount = chefCountResponse.data[0]['COUNT(*)']


} catch (error) {
    console.log("Error in manager stats:", error);
}
     

          res.render("admin/dashboard.ejs",{"currentUser":currentUser,"numCollectedDonations":1,"numAssignedDonations":2,"numAcceptedDonations":3,"numPendingDonations":4,"numAgents":5,"numDonors":6,"numAdmins":7})

        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
