var max_hearts;

document.getElementById('easy').addEventListener('click', function(){

    window.location.href = "./index.html?max_hearts=3";
    
});

document.getElementById('medium').addEventListener('click', function(){

    window.location.href = "./index.html?max_hearts=2";

});

document.getElementById('hard').addEventListener('click', function(){

    window.location.href = "./index.html?max_hearts=1";

});