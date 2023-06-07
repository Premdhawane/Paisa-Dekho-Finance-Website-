firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace('login.html')
    }
    else {
        dataInsert(user.uid);
    }
})
const logout = document.querySelector("#logout");
logout.addEventListener('click', () => {
    firebase.auth().signOut();
});
var database = firebase.database();
function dataInsert(uid) {
    let categoryamt = {
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Entertainment: 0,
        Fuel: 0,
        Grocery: 0,
        Pharmacy: 0,
        Lifestyle: 0,
        Others: 0,
    }
    let userData={
        Budget:0,
        Expense:0,
        FixedExpense:0,
        Income:10,
        Balance:0
    }
    database.ref('/Expense/' + uid).once("value", (snapshot) => {
        var data = snapshot.val();
        
        console.log(data, categoryamt.Food);
        console.log(categoryamt.Food);
        for (let i in data) {
            switch (data[i].Category) {
                case 'Food':
                    categoryamt.Food +=parseInt(data[i].Amount);

                    break;
                case 'Fashion':
                    categoryamt.Fashion += parseInt(data[i].Amount);
                    break;
                case 'Electronics':
                    categoryamt.Electronics += parseInt(data[i].Amount);
                    break;
                case 'Entertainment':
                    categoryamt.Entertainment += parseInt(data[i].Amount);
                    break;
                case 'Fuel':
                    categoryamt.Fuel += parseInt(data[i].Amount);
                    break;
                case 'Grocery':
                    categoryamt.Grocery += parseInt(data[i].Amount);
                    break;
                case 'Pharmacy':
                    categoryamt.Pharmacy += parseInt(data[i].Amount);
                    break;
                case 'Lifestyle':
                    categoryamt.Lifestyle += parseInt(data[i].Amount);
                case 'Others':
            }
        }
        var food=document.querySelector('#Food');
        var fashion=document.querySelector('#Fashion');
        var electronics=document.querySelector('#Electronics');
        var entertainment=document.querySelector('#Entertainment');
        var fuel=document.querySelector('#Fuel');
        var grocery=document.querySelector('#Grocery');
        var pharmacy=document.querySelector('#Pharmacy');
        var lifestyle=document.querySelector('#Lifestyle');
        var others=document.querySelector('#Others');
console.log("Hemlo",lifestyle)
        food.innerHTML='Rs'+categoryamt.Food;
        fashion.innerHTML='Rs'+categoryamt.Fashion;
        electronics.innerHTML='Rs'+categoryamt.Electronics;
        entertainment.innerHTML='Rs'+categoryamt.Entertainment;
        fuel.innerHTML='Rs'+categoryamt.Fuel;
        grocery.innerHTML='Rs'+categoryamt.Grocery;
        pharmacy.innerHTML='Rs'+categoryamt.Pharmacy;
        lifestyle.innerHTML='Rs'+categoryamt.Lifestyle;
        others.innerHTML='Rs'+categoryamt.Others;
        chartInsert(categoryamt,uid)
    });
    database.ref("/users/" + uid).once("value", function (snapshot) {
        var data = snapshot.val();
        console.log(data);  
        userData.Budget=parseInt(data.Budget);
        console.log("hey",userData.Budget)
        userData.Expense=parseInt(data.Expense)+parseInt(data.FixedExpense);
        userData.FixedExpense=parseInt(data.FixedExpense);
        userData.Balance=userData.Budget-userData.Expense;

        

        var bud=document.querySelector('.budget');
        var TE=document.querySelector('.expense');
        var Bal=document.querySelector('.balance');
        
        console.log(bud,userData);
        bud.innerHTML='Rs'+userData.Budget;
        TE.innerHTML='Rs'+userData.Expense;
        Bal.innerHTML='Rs'+userData.Balance;
        
      });  
}
function chartInsert(categoryamt,uid)
{
    database.ref('/Total/'+uid).once("value", function (snapshot) {
    let data=snapshot.val();
    let total=parseInt(data.TotalExpense);
    console.log(categoryamt,total)
    let charpercentage={
        Food:(categoryamt.Food/total)*100,
        Fashion:(categoryamt.Fashion/total)*100,
        Electronics:(categoryamt.Electronics/total)*100,
        Entertainment:(categoryamt.Entertainment/total)*100,
        Fuel:(categoryamt.Fuel/total)*100,
        Grocery:(categoryamt.Grocery/total)*100,
        Pharmacy:(categoryamt.Pharmacy/total)*100,
        Lifestyle:(categoryamt.Lifestyle/total)*100,
        Others:(categoryamt.Others/total)*100

    }
    console.log("percentage",charpercentage)
    $(document).ready(function () {
        var chart = {
           type: 'pie',
           options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
           }
        };
    
    
        var title = {
           text: 'Graphical Analysis of Expenses'
        };
        var tooltip = {
           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        var plotOptions = {
           pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
    
              dataLabels: {
                 enabled: true,
                 format: '{point.name}'
              }
           }
        };
        var series = [{
           type: 'pie',
           name: 'Browser share',
           data: [
              ['Food', charpercentage.Food],
              ['Fashion', charpercentage.Fashion],
              {
                 name: 'Electronics',
                 y: charpercentage.Electronics,
                 sliced: true,
                 selected: true
              },
              ['Entertainment', charpercentage.Entertainment],
              ['Fuel', charpercentage.Fuel],
              {
                 name: 'Grocery',
                 y: charpercentage.Grocery,
                 sliced: true,
                 selected: true
              },
              {
                 name: 'Pharmacy',
                 y: charpercentage.Pharmacy,
                 sliced: true,
                 selected: true
              },
              {
                 name: 'Lifestyle',
                 y: charpercentage.Lifestyle,
                 sliced: true,
                 selected: true
              },
    
              {
                 name: 'Others',
                 y: charpercentage.Others,
                 sliced: true,
                 selected: true
              },
    
           ]
        }];
        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.plotOptions = plotOptions;
        json.series = series;
        $('#container').highcharts(json);
     });
    });
}