const pimp=new XMLHttpRequest();
pimp.open('GET','https://supersimplebackend.dev/products/first');
pimp.send();
pimp.addEventListener('load',()=>{
    console.log( pimp.response);
})