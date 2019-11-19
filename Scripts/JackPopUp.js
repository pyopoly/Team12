/*****-----------------------The join group popup toggle on and off---------------------***/
            $(document).ready(function() {
                $(document).on('click', 'div[id^=group]', function(){
                    $('.detailsOfGroups').show(200);
                    $('.detailsOfGroups').css({
                        'z-index': '1',
                        'position' : 'absolute'
                    });
                    $('.info1').html("<span id='close'>close</span>");
                    $('#mapid').css({
                        'z-index': '-2',
                    });
                });
            });

            $(document).ready(function() {
                $(document).on('click', '#close', function(){
                    $('.detailsOfGroups').hide(200);
                    $('#mapid').css({
                        'z-index': '2'
                    });
                });
            });