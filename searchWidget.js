'use strict';

const data = [
'Arts & Humanities',
'Business & Law',
'Catalogs & Tools',
'Health Science & Medicine',
'Reference',
'Science & Technology',
'Social Sciences',
'Allied Health',
'Anthropology & Archeology',
'Area Studies',
'Art & Architecture',
'Biography',
'Biology',
'Biomedical Engineering',
'Book Reviews',
'Business',
'Chemical Engineering',
'Chemistry',
'Civil Engineering',
'Communications',
'Computer Science',
'Conference Proceedings',
'Current Events',
'Dictionaries, Directories & Encyclopedias',
'Dissertations & Theses',
'Economics',
'Education',
'Electrical Engineering',
'Electronic Books',
'Engineering',
'Ethnic Studies',
'Geology',
'History',
'History of Science',
'International Studies',
'Language & Literature',
'Law & Legislation',
'Library & Information Science',
'Materials Science',
'Mathematics',
'Mechanical Engineering',
'Music',
'Newspapers',
'Nursing',
'Patents',
'Performing Arts',
'Philosophy',
'Physics',
'Political Science',
'Polymer Science',
'Psychology',
'Public Policy',
'Religion',
'Rubber Science & Technology',
'Social Work',
'Sociology',
'Statistics'
];

(function populateData(data){
    let ul = document.getElementById('dataList');
    
    // populate list based on items in data
    for(let item in data){
        let li = document.createElement('li');
        li.classList = "dataItem";
        li.id = data[item].replace(/\s|&/g,'');
        li.innerHTML = `${data[item]}`;
        ul.appendChild(li);
    }
    document.getElementById('searchable').appendChild(ul);

})(data);

// Jquery event handlers
$(function(){ 

    // mousedown fires before blur
    $('#dataList').on('mousedown', 'li',function(){
        let val = $(this)[0].innerText.replace('&','and');
        let url = 'http://www.google.com/#safe=off&q='+val;
        window.location = url;       
    });

    // closes list if losing focus
    $('#searchTerms').blur(function(){
        $('.toggle').css('visibility','visible');
        $('#searchable').css('display','none');
    });
        
    $('.toggle').click(function(){
        $('.toggle').css('visibility','hidden');
        $('#searchable').css('display','block');
        $('#searchTerms').focus();
    });
        
    // performs the search based on user input
    $('#searchTerms').on('keyup',function(e){
        let ul = $('#dataList');
        
        // want the user to select an option from the list so 'enter' is disabled
        if(e.keyCode == 13) return;

        let strToSearch = strip($(this).val()).trim();
        let rgx = new RegExp(strToSearch,'gi');

        for(let item in data){
            let testOn = data[item].replace(/\s|&/g,'');
            let li = $('#'+testOn);   
            if(!rgx.test(testOn)) ul.find(li).hide();         
            else ul.find(li).show();
        }
    });

    
});

// clear malictous char from data
function strip(data){
    return data.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,'');
}
