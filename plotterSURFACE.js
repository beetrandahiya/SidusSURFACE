
clcktm = 0;
darkplottoggle=0;

document.getElementById('inputfunc').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    funcinp=ev.target.getValue('ascii-math');
});

function plotgraph() {
  

  funcinp.trim();
  funcinp=funcinp.replace(/⋅/g, "*");
  const expr = math.compile(funcinp);                         //compile function       
       
    var dmnstart = parseFloat(document.getElementById("dmnstart").value)||-2*Math.PI;
    var dmnend = parseFloat(document.getElementById("dmnend").value)||2*Math.PI;
  
  var size = 60,                                        //make arrays of size 100
    xval = new Array(size),
    yval = new Array(size),
    zval = new Array(size),
    i,
    j;
  
  for (var i = 0; i < size; i++) {
    xval[i] = yval[i] = dmnstart + ((dmnend-dmnstart) * i) / size;                 //add values to arrays
    zval[i] = new Array(size);                                                 //make arrays of length size as elements of z
  }
  
  for (var i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      xv=xval[i];
      yv=yval[j];
      var r2 = expr.evaluate({x:xv,y:yv});                                  //evaluating and adding value of z
      zval[j][i] = r2;
    }
  }
  

wrkwdth=$("#workspace").width();
wrkwdth=wrkwdth-50;
wrkrng=wrkwdth/60;

var data_z = {z: zval,x:xval,y:yval, type: 'surface',colorscale: "Jet"};            //making dataset

  var layout = {
autosize: false,
  width: wrkwdth, 
    height: 640,
    margin: {
      l: 20,
      r: 20,
      b: 20,
      t: 20,
      pad: 4
    },
    paper_bgcolor: '#fcfcfc',
    plot_bgcolor: '#fcfcfc'
  };

 
  Plotly.newPlot('plotarea', [data_z],layout,{ displaylogo: false , responsive: true,modeBarButtonsToRemove: ['select2d', 'lasso2d', 'toggleSpikelines', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'] });                   //plotting 

   

}

/*contours: {
    x: { show: true },
    y: { show: true },                
    z: { show: true }
  },
*/ // to show contours


//dark mode toggle
function toggledark(){

  $("body").toggleClass("dark-bg");
  $(".navbar").toggleClass("dark-bg"); //navbar
  $(".navbar").toggleClass("text-white");
  $("#dmnend").toggleClass("text-white");
  $("#dmnstart").toggleClass("text-white");
  $("#workspace").toggleClass("dark-bg"); //workspace

  if (!$("#controls").hasClass('bg-dark')) {
    $("#controls").removeClass('bg-white');
    $("#controls").addClass('bg-dark');
    $("#controls").addClass('text-white');
} else {
    $("#controls").removeClass('bg-dark');
    $("#controls").addClass('bg-white');
    $("#controls").removeClass('text-white');
}
/////////////////////////////////////// home button icon change /////////////////////////////////////////////////////////

if (!$("#home-btn").hasClass('whitebtn')) {
  $("#home-btn").attr('src', './content/icons/homewhite.png');
  $("#home-btn").addClass('whitebtn')
} else {
  $("#home-btn").attr('src', './content/icons/homeblack.png');
  $("#home-btn").removeClass('whitebtn')
}


/////////////////////////////////////// apps button icon change ////////////////////////////////////////////////


if (!$("#apps-btn").hasClass('whitebtn')) {
  $("#apps-btn").attr('src', './content/icons/appswhite.png');
  $("#apps-btn").addClass('whitebtn')
} else {
  $("#apps-btn").attr('src', './content/icons/appsblack.png');
  $("#apps-btn").removeClass('whitebtn')
}


////////////////////////////////////// about button icon change ////////////////////////////////////////////////////


if (!$("#about-btn").hasClass('whitebtn')) {
  $("#about-btn").attr('src', './content/icons/aboutwhite.png');
  $("#about-btn").addClass('whitebtn')
} else {
  $("#about-btn").attr('src', './content/icons/aboutblack.png');
  $("#about-btn").removeClass('whitebtn')
}


///////////////////////////////////// dark mode button icon change ////////////////////////////////////////////////


if (!$("#drkmd-btn").hasClass('whitebtn')) {
  $("#drkmd-btn").attr('src', './content/icons/sun.png');
  $(".btn-round").addClass('bg-white');
  $(".btn-round").removeClass('bg-dark');
  $("#drkmd-btn").addClass('whitebtn')
} else {
  $("#drkmd-btn").attr('src', './content/icons/moon.png');
  $("#drkmd-btn").removeClass('whitebtn');
  $(".btn-round").removeClass('bg-white');
  $(".btn-round").addClass('bg-dark');
}

if (darkplottoggle == 0) {
  layout = { //making layout
    autosize: false,
      width: wrkwdth,
      height: 600,
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#25232D',
      plot_bgcolor: '#25232D'
  };
  Plotly.react('plotarea', data, layout, {
      displaylogo: false,
      scrollZoom: true,
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian']
  }); //using Plotly.react becoz its faster , it creates the plot again

  darkplottoggle = 1;

} else {

  layout = { //making layout
    autosize: false,
    width: wrkwdth, 
      height: 600,
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#fcfcfc',
      plot_bgcolor: '#fcfcfc'
  };
  Plotly.react('plotarea', data, layout, {
      displaylogo: false,
      responsive: true,
      scrollZoom: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian']
  }); //using Plotly.react becoz its faster , it creates the plot again

  darkplottoggle = 0;
}

}