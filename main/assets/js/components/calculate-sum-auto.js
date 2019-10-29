// $(function () {                                      
//     $('.b-secondary-nav.navigation__item a').each(function () {             
//         var location = window.location.href; 
//         var link = this.href;                
//         if(location == link) {               
//             $(this).addClass('navigation__link--active'); 
//         }
//     });
// });	

// $(function () {                                      
//     $('.b-primary-nav.navigation__item a').each(function () {             
//         var location = window.location.href; 
//         var link = this.href;                
//         if(location == link) {               
//             $(this).addClass('navigation__link--active');  
//         }
//     });
// });


// $("body").on("change", "#mark", function() {
//   var name = "";
//   $("#mark option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#mark option:selected").val();
  
//   if(id == 0){
//   } else {
//       $("#mark").val(id);
//       getModel();
//   }
  
// }).trigger("change");

// $("body").on("change", "#model", function() {
//   var name = "";
//   $("#model option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#model option:selected").val();
  
//   if(id == 0){
      
//   } else {
//       $("#model").val(id);
//       getYear();
//   }
  
// }).trigger("change");

// $("body").on("change", "#year", function() {
//   var name = "";
//   $("#year option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#year option:selected").val();
  
//   if(id == 0){
      
//   } else {
//       $("#year").val(id);
//   }
  
// }).trigger("change");


// function getMaker() {
//   var options = "<option value=''>Выберите марку</option>";
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {"func":"GetMakers"},
//       beforeSend : function (){
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#mark").html(options);
//       },
//       error: function(){
//       }
//   });
// }


// function getModel() {
//   var options = "<option value=''>Выберите модель</option>";
//   var mark = $("#mark").val();
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {
//           "func":"GetModels",
//           "mark":mark
//       },
//       beforeSend : function (){
          
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#model").html(options);
//       },
//       error: function(){            
//       }
//   });
// }


// function getYear() {
//   var options = "<option value=''>Выберите год</option>";
//   var mark = $("#mark").val();
//   var model = $("#model").val();
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {
//           "func":"GetYears",
//           "mark":mark,
//           "model":model,
//       },
//       beforeSend : function (){
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#year").html(options);
//       },
//       error: function(){
//       }
//   });
// }


// getMaker();

// function sendFormWidgetCalc()  {
//   var f = $('#WidgetCalcForm').serializeObject();
//   $.ajax({
//       type: "POST",
//       url: "/api/calculation/",
//       dataType: "json",
//       data: {
//           "mark":f.mark,
//           "model":f.model,
//           "year":f.year,
//       },
//       beforeSend : function (){
//           $("#WidgetCalcPlace").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//       },
//       success: function(data){
//           setTimeout(function(){
//               if (data.success == true){
//                   $("#WidgetCalcPlace #bLoader").remove();	
//                   $("#WidgetCalcPlace").html("");
//                   $("#WidgetCalcPlace").html(data.html);
//               } else {
//                   $("#WidgetCalcPlace").html("");
//                   $("#WidgetCalcPlace").html(data.html);
//                   $("#WidgetCalcPlace #bLoader").remove();
//               }
//           }, 1000);
//       },
//       error: function(){
//           $("#WidgetCalcPlace #bLoader").remove();
//       }	
//   });    
// };

// function sendFormCalcCallback()  {

// var f = $('#WidgetCalcForm').serializeObject();
// var i = $('#formPageInfo').serializeObject();
  
//    $.ajax({
//       type: "POST",
//       url: "/api/forms/post/buyout/", // Адрес обработчика
//       dataType: "json",
//   data: {
//     "name":f.name,
//     "phone":f.phone,
//     "email":f.email,
//     "mark":f.mark,
//     "model":f.model,
//     "year":f.year,
//     "cash":f.cash,
//     "page_id":i.page_id,
//   },
//   beforeSend : function (){
//     $("#WidgetCalcPlace").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//   },
//   success: function(data){
//     setTimeout(function(){
//       console.log(data);
//       if (data.success == true){
//           dataLayer.push({
//           "sub": "Заявка на оценку авто",
//           "event":"sendWidgetCalcForm",
//           "eventAction":"sendWidgetCalcForm"
//           });	
//         $("#WidgetCalcPlace #bLoader").remove();	
//         $("#WidgetCalcPlace").html("");
//         $("#WidgetCalcPlace").html("<div><h3>Заявка на детальную оценку</h3><p>" + data.message + "</p></div>");

//       } else {
//         $("#WidgetCalcPlace #bLoader").remove();
//       }
//     }, 1000);
//   },
//   error: function(){
//     $("#WidgetCalcPlace #bLoader").remove();
//   }	
//   });    
// };


// function sendFormTestdrive() {
// var f = $('#formTestdrive').serializeObject();
// var i = $('#formPageInfo').serializeObject();
//    $.ajax({
//       type: "POST",
//       url:"/api/forms/post/test-drive/",
//       dataType: "json",
//   data: {
//     "name":f.name,
//     "phone":f.phone,
//     "email":f.email,
//     "site": i.pageTitle,
//   },
//   beforeSend : function (){
//     $("#formTestdrivet").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//   },
//   success: function(data){
//     setTimeout(function(){
//       if (data.success == true){
//         $("#formTestdrive #bLoader").remove();	
//         $("#formTestdrive").html("");
//         $("#formTestdrive").append("<div class='b-message text-center my-4'>" + data.message + "</div>");
        
//         dataLayer.push({
//           'event':'sendFormTestdrive',
//           'eventAction':'sendFormTestdrive'
//         });

//       } else {
//         $("#formTestdrive #bLoader").remove();
//       }
//     }, 1000);
//   },
//   error: function(){
//     $("#formTestdrive #bLoader").remove();
//   }	
//   });
// return false;
// }

// $.fn.serializeObject = function(){
//   var o = {};
//   var a = this.serializeArray();
//   $.each(a, function() {
//       if (o[this.name] !== undefined) {
//           if (!o[this.name].push) {
//               o[this.name] = [o[this.name]];
//           }
//           o[this.name].push(this.value || '');
//       } else {
//           o[this.name] = this.value || '';
//       }
//   });
//   return o;
// };