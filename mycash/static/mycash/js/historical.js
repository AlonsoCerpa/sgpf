months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
la_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
day_week=["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

var endpt = '/mycash/api/historical/data/'

function calendar(){
    today=new Date();
    day_wc=today.getDay();
    day_c=today.getDate();
    month_c=today.getMonth();
    year_c=today.getFullYear();

    //first
    titles=document.getElementById("titles");
    prev=document.getElementById("prev");
    next=document.getElementById("next");

    r0=document.getElementById("row0");

    // second
    ttitles=document.getElementById("ttitles");
    tprev=document.getElementById("tprev");
    tnext=document.getElementById("tnext");

    tr0=document.getElementById("trow0");

    // first
    document.search.search_year.value=year_c;
    month_cal = month_c;
    year_cal = year_c

    // second
    document.tsearch.tsearch_year.value=year_c;
    tmonth_cal = month_c;
    tyear_cal = year_c

    $.ajax({
        method: "GET",
        url: endpt,
        success: function(data){
            month = data.month
            over = data.over

            console.log(over)

            header()
            theader()

            first_line()
            tfirst_line()

            write_days()
            twrite_days()
        },
        error: function(error_data){
            console.log("error")
            console.log(error_data)
        }
    })
}

function header() {
    titles.innerHTML=months[month_cal]+", "+year_cal;
    month_prev=month_cal-1;
    month_next=month_cal+1;
    if (month_prev<0){
        month_prev=11;
    }
    if (month_next>11){
        month_next=0;
    }

    prev.innerHTML=months[month_prev]
    next.innerHTML=months[month_next]
}

function first_line() {
    for (i=0;i<7;i++) {
        grid0=r0.getElementsByTagName("th")[i];
        grid0.innerHTML=day_week[i]
     }
}

function search_inside(td, tm, ty){
    var k = 0, i;
    var tmd, tmm, tmy;
    var str;
    for(i=0; i<over.length; i++){
        str = over[i];
        tmy = parseInt(str.substring(0,4));
        tmm = parseInt(str.substring(5,7));
        tmd = parseInt(str.substring(8,10));

        if(tmd==td && tmm==tm && tmy==ty){
            k = 1;
            break;
        }
    }
    return k;
}

function write_days() {
    f_month=new Date(year_cal,month_cal,"0")
    pr_week=f_month.getDay()

    if (pr_week==-1){
        pr_week=6;
    }

    daypr_month=f_month.getDate()
    prcelda=daypr_month-pr_week;
    begin=f_month.setDate(prcelda)
    day_month=new Date()
    day_month.setTime(begin);

    my_month=day_month.getMonth()
    my_year=day_month.getFullYear()

    for (i=1;i<7;i++){
        row=document.getElementById("row"+i);
        for (j=0;j<7;j++) {
            my_day = day_month.getDate()
            my_month = day_month.getMonth()
            my_year = day_month.getFullYear()

            grid=row.getElementsByTagName("td")[j];
            grid.innerHTML=my_day;

            grid.style.color="black";
            grid.style.backgroundColor="white";

            if (j==0) {
                grid.style.color="#f11445";
            }

            if (my_month!=month_cal) {
                grid.style.color="#a0babc";
            }

            if (search_inside(my_day, my_month+1, my_year) == 1){
                grid.style.backgroundColor="#f0b19e";
            }

            my_day=my_day+1;
            day_month.setDate(my_day);
        }
    }
}

function month_p() {
    new_month=new Date()
    f_month--;
    new_month.setTime(f_month)
    month_cal=new_month.getMonth()
    year_cal=new_month.getFullYear()
    header()
    write_days()
}

//ver mes posterior
function month_n() {
    new_month=new Date()
    time_unix=f_month.getTime()
    time_unix=time_unix+(45*24*60*60*1000)
    new_month.setTime(time_unix)
    month_cal=new_month.getMonth()
    year_cal=new_month.getFullYear()
    header()
    write_days()
}

function my_date(){
    my_year=document.search.search_year.value;
    list_months=document.search.search_month;
    options=list_months.options;
    num=list_months.selectedIndex
    my_month=options[num].value;

    if (isNaN(my_year) || my_year<1) {
        alert("Error: Year must be grater than 0")
    }
    else {
        my_dat=new Date();
        my_dat.setMonth(my_month);
        my_dat.setFullYear(my_year);
        month_cal=my_dat.getMonth();
        year_cal=my_dat.getFullYear();

        header()
        write_days()
    }
}


// second!!
function theader() {
    ttitles.innerHTML=months[tmonth_cal]+", "+tyear_cal;
    tmonth_prev=tmonth_cal-1;
    tmonth_next=tmonth_cal+1;

    if (tmonth_prev<0){
        tmonth_prev=11;
    }
    if (tmonth_next>11){
        tmonth_next=0;
    }

    tprev.innerHTML=months[tmonth_prev]
    tnext.innerHTML=months[tmonth_next]
}

function tfirst_line() {
    for (i=0;i<7;i++) {
        grid0=tr0.getElementsByTagName("th")[i];
        grid0.innerHTML=day_week[i]
     }
}

function twrite_days() {
    tf_month=new Date(tyear_cal,tmonth_cal,"0")
    pr_week=tf_month.getDay()

    if (pr_week==-1){
        pr_week=6;
    }

    daypr_month = tf_month.getDate()
    prcelda = daypr_month-pr_week;
    begin = tf_month.setDate(prcelda)
    tday_month = new Date()
    tday_month.setTime(begin);

    tmy_month=tday_month.getMonth()
    tmy_year=tday_month.getFullYear()

    for (i=1;i<7;i++){
        trow=document.getElementById("trow"+i);
        for (j=0;j<7;j++) {
            tmy_day = tday_month.getDate()
            tmy_month = tday_month.getMonth()
            tmy_year = tday_month.getFullYear()

            grid=trow.getElementsByTagName("td")[j];
            grid.innerHTML=tmy_day;

            grid.style.color="black";
            grid.style.backgroundColor="white";

            if (j==0) {
                grid.style.color="#F9C5C5";
            }

            if (tmy_month!=tmonth_cal) {
                grid.style.color="#a0babc";
            }

            if (search_inside(tmy_day, tmy_month+1, tmy_year) == 1){
                grid.style.backgroundColor="#f0b19e";
            }

            tmy_day=tmy_day+1;
            tday_month.setDate(tmy_day);
        }
    }
}

function tmonth_p() {
    tnew_month=new Date()
    tf_month--;
    tnew_month.setTime(tf_month)
    tmonth_cal=tnew_month.getMonth()
    tyear_cal=tnew_month.getFullYear()
    theader()
    twrite_days()
}

//ver mes posterior
function tmonth_n() {
    tnew_month=new Date()
    time_unix=tf_month.getTime()
    time_unix=time_unix+(45*24*60*60*1000)
    tnew_month.setTime(time_unix)
    tmonth_cal=tnew_month.getMonth()
    tyear_cal=tnew_month.getFullYear()
    theader()
    twrite_days()
}

function tmy_date() {
    tmy_year=document.tsearch.tsearch_year.value;
    list_months=document.tsearch.tsearch_month;
    options=list_months.options;
    num=list_months.selectedIndex
    tmy_month=options[num].value;

    if (isNaN(tmy_year) || tmy_year<1) {
        alert("Error: Year must be grater than 0")
    }
    else {
        my_dat=new Date();
        my_dat.setMonth(tmy_month);
        my_dat.setFullYear(tmy_year);
        tmonth_cal=my_dat.getMonth();
        tyear_cal=my_dat.getFullYear();

        theader()
        twrite_days()
    }
}