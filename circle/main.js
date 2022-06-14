const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;

//all particle atraction point
let aap=[];
//y-cordinate of point avarge
let ya=0;
//x-cordinate of point avarge
let xa=0;
//point distance
let pd=[];
//array to store y-corrdinate of points
let y=[];
//array to store x-corrdinate of points
let x=[];
//mouse x 
let mx=0;
//mouse y 
let my=0;
//x axis start x-corrdinate
let xxs=0;
//x axis end x-corrdinate 
let xxe=0;
//x axis start y-corrdinate
let xys=0;
//x axis end y-corrdinate 
let xye=0;
//y axis start x-corrdinate
let yxs=0;
//y axis end x-corrdinate 
let yxe=0;
//y axis start y-corrdinate
let yys=0;
//y axis end y-corrdinate 
let yye=0;

function getCoordinateAfterRepailtion(x1,y1,x2,y2,othx,othy){
    if(distance(x1,y1,x2,y2)<100 && distance(x1,y1,x2,y2)>0){
        let ox=x1;
        let oy=y1;
        let cx=x2;
        let cy=y2;
        let d=Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));
        if(d<0){
            d=d*-1
        }
        let a=-1+100/d;
        x1=(cx+(x1*(a+1)));
        y1=(cy+(y1*(a+1)));
        if(distance(x2,y2,x1,y1)>distance(x2,y2,othx,othy) && distance(x2,y2,x1,y1)!=distance(x2,y2,othx,othy)){
            let rx=x1-ox;
            let ry=y1-oy;
            let k=othx-ox;
            let m=othy-oy;
            let A=rx*rx+ry*ry;
            let B=-2*(k*rx+m*ry);
            let C=k*k+m*m-10000;
            let b=(-k+m*(ry/rx))/(rx-((ry*ry)/rx));
            let nix=ox+(rx*b);
            let niy=oy+(ry*b);
            if(distance(othx,othy,nix,niy)<100 && distance(othx,othy,x1,y1)>0 && distance(othx,othy,x2,y2)>0){
                let d=Math.sqrt((B*B)+(-4*A*C));
                if(d<0){
                    d=d*-1
                }
                let a=(-B-d)/(2*A);
                x1=ox+(rx*a);
                y1=oy+(ry*a);
            }else{
                let arr=[x1,y1];
                return arr;
            }
            let arr=[x1,y1];
            return arr;
        }else{
            let arr=[x1,y1];
            return arr;
        }
    }else{
        let arr=[x1,y1];
        return arr;
    }
}

//create axis with no property 
function axis(sx,sy,ex,ey){
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(ex,ey);
        ctx.stroke();
    } 

//function to find distance 
function distance(x1,y1,x2,y2){
    let d=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    return d;
}

//axis line coordinate
addEventListener("mousedown",moveline=()=>{
    ctx.fillStyle='green';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    mx=event.clientX;
    my=event.clientY;
    xxs=0;    
    xxe=canvas.width;    
    xys=my;    
    xye=my;    
    yxs=mx;   
    yxe=mx;    
    yys=0; 
    yye=canvas.height;                    
})

//particle number
let pn=25;
//attraction particle number
let atpn=10;
//repailtion particle number
let rpn=17;
    let items = 20; // say there are 10 points to be plotted.
    let x0 = yxe;
    let y0 = xys;
    let bxa =[];
    let bya =[];
    // Remember top left pixel of computer screen is (0,0) and both axis go positive from left to right and top to bottom.
    
    for(var i = 0; i < items; i++) {
        bxa[i]= x0 + 500 * Math.cos(2 * Math.PI * i / items); // WHAT IS HAPPENING HERE?
        bya[i]= y0 + 500 * Math.sin(2 * Math.PI * i / items); // WHAT IS HAPPENING HERE?

    }
    for(let i=0;i<pn/4;i++){
    x[i]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    y[i]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    }
    for(let t=pn/4;t<pn/2;t++){
    x[t]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    y[t]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    }
    for(let k=pn/2;k<pn/2+pn/4;k++){
    x[k]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    y[k]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    }
    for(let o=pn/2+pn/4;o<4*pn/4;o++){
    x[o]=(Math.round(Math.floor(Math.random(-400,400)*350)));
    y[o]=(Math.round(Math.floor(Math.random(-400,400)*-350)));
    }

//all particle number
let apn=pn;

let t=[];
let b=[];
let r=[];
let l=[];
let ne=[];
let nw=[];
let se=[];
let sw=[];
let arr=[];
let c=[];
let xb=0;
let yb=0;
let cvi=0;

//function to define direction
function direction(){
    ne.splice(0,ne.length);
    nw.splice(0,nw.length);
    se.splice(0,se.length);
    sw.splice(0,sw.length);
    t.splice(0,t.length);
    b.splice(0,b.length);
    r.splice(0,r.length);
    l.splice(0,l.length);
    aap.splice(0,aap.length);
    for(let i=0;i<apn;i++){
        pd.push(distance(x[i],y[i],0,0));
        if(Math.sign(x[i])===1 && Math.sign(y[i])===1){
            let arr={x:x[i],y:y[i]};
            ne.push(arr);
        }
        if(Math.sign(x[i])===-1 && Math.sign(y[i])===1){
            let arr2={x:x[i],y:y[i]};
            nw.push(arr2);
        }
        if(Math.sign(x[i])===1 && Math.sign(y[i])===-1){
            let arr3={x:x[i],y:y[i]};
            se.push(arr3);
        }
        if(Math.sign(x[i])===-1 && Math.sign(y[i])===-1){
            let arr4={x:x[i],y:y[i]};
            sw.push(arr4);
        }
        if(Math.sign(x[i])===0 && Math.sign(y[i])===1){
            let arr5={x:x[i],y:y[i]};
            t.push(arr5);
        }
        if(Math.sign(x[i])===0 && Math.sign(y[i])===-1){
            let arr6={x:x[i],y:y[i]};
            b.push(arr6);
        }
        if(Math.sign(x[i])===1 && Math.sign(y[i])===0){
            let arr7={x:x[i],y:y[i]};
            r.push(arr7);
        }
        if(Math.sign(x[i])===-1 && Math.sign(y[i])===0){
            let arr8={x:x[i],y:y[i]};
            l.push(arr8);
        }
        xa=0;
        let tpd=apn/8;
        let diff=0;
        let diff2=0;
        let diff3=0;
        let diff4=0;
        let diff5=0;
        let diff6=0;
        let diff7=0;
        let diff8=0;
        if(ne.length>tpd){
            diff=ne.length-tpd;
            xa=xa+(diff/(apn-tpd)*500);
        }
        if(nw.length>tpd){
            diff2=nw.length-tpd;
            xa=xa+(diff2/(apn-tpd)*500);
        }
        if(se.length>tpd){
            diff3=se.length-tpd;
            xa=xa+(diff3/(apn-tpd)*500);
        }
        if(sw.length>tpd){
            diff4=sw.length-tpd;
            xa=xa+(diff4/(apn-tpd)*500);
        }
        if(t.length>tpd){
            diff5=t.length-tpd;
            xa=xa+(diff5/(apn-tpd)*500);
        }
        if(b.length>tpd){
            diff6=b.length-tpd;
            xa=xa+(diff6/(apn-tpd)*500);
        }
        if(r.length>tpd){
            diff7=r.length-tpd;
            xa=xa+(diff7/(apn-tpd)*500);
        }
        if(l.length>tpd){
            diff8=l.length-tpd;
            xa=xa+(diff8/(apn-tpd)*500);
        }
        c=[diff,diff2,diff3,diff4,diff5,diff6,diff7,diff8];
        let cv=Math.max(...c);
        cvi=c.indexOf(cv);
        if(cvi===0){
            for(let v=0;v<ne.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(ne[v].x);
                ta2.push(ne[v].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);           
            }
        }
        if(cvi===1){
            for(let k=0;k<nw.length;k++){
                let ta=[];
                let ta2=[];
                ta.push(nw[k].x);
                ta2.push(nw[k].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(axm>0){
                    axm=axm*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
        if(cvi===2){
            for(let c=0;c<se.length;c++){
                let ta=[];
                let ta2=[];
                ta.push(se[c].x);
                ta2.push(se[c].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(aym>0){
                    aym=aym*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
        if(cvi===3){
            for(let s=0;s<sw.length;s++){
                let ta=[];
                let ta2=[];
                ta.push(sw[s].x);
                ta2.push(sw[s].y);
                let axm=ta.reduce((a,b)=>a*b);
                let aym=ta2.reduce((a,b)=>a*b);
                if(axm>0){
                    axm=axm*-1;
                }
                if(aym>0){
                    aym=aym*-1;
                }
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
                yb=aym*a;
                aap.pop();
                aap.push(xb,yb);
                aap.splice(0,aap.length-2);
            }
        }
        if(cvi===4){
            for(let v=0;v<t.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(t[v].x);
                ta2.push(t[v].y);
                axm=ta.reduce((a,b)=>a*b);
                aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                yb=aym*a;
            }
        }
        if(cvi===5){
            for(let v=0;v<b.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(b[v].x);
                ta2.push(b[v].y);
                axm=ta.reduce((a,b)=>a*b);
                aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                yb=aym*a;
            }
        }
        if(cvi===6){
            for(let v=0;v<r.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(r[v].x);
                ta2.push(r[v].y);
                axm=ta.reduce((a,b)=>a*b);
                aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
            }
        }
        if(cvi===7){
            for(let v=0;v<l.length;v++){
                let ta=[];
                let ta2=[];
                ta.push(l[v].x);
                ta2.push(l[v].y);
                axm=ta.reduce((a,b)=>a*b);
                aym=ta2.reduce((a,b)=>a*b);
                let d=Math.pow(axm,2)+Math.pow(aym,2);
                let a=xa/Math.sqrt(d);
                xb=axm*a;
            }
        }
    }
}
//function to create attaraction point
function allpoint(){
    for(let i=0;i<apn;i++){
        cx=[(aap[0]-x[i])/10]
        cy=[(aap[1]-y[i])/10]
        x[i]=x[i]+cx[0];
        y[i]=y[i]+cy[0];
        ctx.beginPath();
        ctx.fillStyle='green';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.closePath();
    }
    let othax=[];
    let othay=[];
    let repx=[];
    let repy=[];
    let hrepx=[];
    let hrepy=[];
    repx.splice(0,x.length-1);
    repy.splice(0,y.length-1);
    hrepx.splice(0,rpn);
    hrepy.splice(0,rpn);
    othax.splice(0,rpn);
    othay.splice(0,rpn);
    for(let k=0;k<x.length;k++){
        repx.push(x[k]);
        repy.push(y[k]);
    }
    for(let n=0;n<rpn;n++){
        hrepx.push(x[n]);
        hrepy.push(y[n]);
        othax.push(x[n]);
        othay.push(y[n]);
    }
    for(let b=0;b<items;b++){
        othax.push(bxa[b]);
        othay.push(bya[b]);
    }
    let rx=[];
    let i=0;
    let n=0;
    let k=0;
    let g=[];
    let bn=[];
    let ybn=[];
    let s=[];
    let o=[];
    let ij=0;
    let ag=[];
    let abn=[];
    let aybn=[];
    let as=[];
    let ao=[];
    let aij=0;
    function animate(){
        i+=1;
        if(i>-1){
            ybn=[othax[i],othay[i]];
            bn.push(ybn);
            s.push(distance(repx[n],repy[n],ybn[0],ybn[1]));
            o.push(s[i]);
            g=o.sort(function(a, b){return b-a});
            for(let z=0;z<s.length-1;z++){
            ij=s.indexOf(g[z]);
            }
            aybn=[repx[n],repy[n]];
            abn.push(aybn);
            as.push(distance(hrepx[k],hrepy[k],aybn[0],aybn[1]));
            ao.push(as[i]);
            ag=o.sort(function(a, b){return b-a});
            for(let z=0;z<s.length-1;z++){
            aij=s.indexOf(ag[z]);
            }
            rx=getCoordinateAfterRepailtion(repx[aij],repy[aij],hrepx[k],hrepy[k],othax[ij],othay[ij]);
            x[aij]=rx[0];
            y[aij]=rx[1];
            if(i===othax.length-1){
                b.splice(0,b.length-1);
                s.splice(0,s.length-1);
                o.splice(0,o.length-1);
                n=n+1;
                i=0;
            }
            if(n>=repx.length-1){
                k=k+1;
                n=0;
            }
            if(k<hrepx.length){
                animate();
            }
            if(k>=hrepx.length-1){
                k=0;
                return ;
            }
        }
    }
    animate();
    ctx.beginPath();
    ctx.arc(yxe-(-x[0]),xys-y[0],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[1]),xys-y[1],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[2]),xys-y[2],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[3]),xys-y[3],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[4]),xys-y[4],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[5]),xys-y[5],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[6]),xys-y[6],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[7]),xys-y[7],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[8]),xys-y[8],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[9]),xys-y[9],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[10]),xys-y[10],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[11]),xys-y[11],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[12]),xys-y[12],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[13]),xys-y[13],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[14]),xys-y[14],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[15]),xys-y[15],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[16]),xys-y[16],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[17]),xys-y[17],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[18]),xys-y[18],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[19]),xys-y[19],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[20]),xys-y[20],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[21]),xys-y[21],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[22]),xys-y[22],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[23]),xys-y[23],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[24]),xys-y[24],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[25]),xys-y[25],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[26]),xys-y[26],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[27]),xys-y[27],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[28]),xys-y[28],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[29]),xys-y[29],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[30]),xys-y[30],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[31]),xys-y[31],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[32]),xys-y[32],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[33]),xys-y[33],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[34]),xys-y[34],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[35]),xys-y[35],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[36]),xys-y[36],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[37]),xys-y[37],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[38]),xys-y[38],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[39]),xys-y[39],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[40]),xys-y[40],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[41]),xys-y[41],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[42]),xys-y[42],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[43]),xys-y[43],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[44]),xys-y[44],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[45]),xys-y[45],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[46]),xys-y[46],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[47]),xys-y[47],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[48]),xys-y[48],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[49]),xys-y[49],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[50]),xys-y[50],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[51]),xys-y[51],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[52]),xys-y[52],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[53]),xys-y[53],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[54]),xys-y[54],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[55]),xys-y[55],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[56]),xys-y[56],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[57]),xys-y[57],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[58]),xys-y[58],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[59]),xys-y[59],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[60]),xys-y[60],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[61]),xys-y[61],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[62]),xys-y[62],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[63]),xys-y[63],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[64]),xys-y[64],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[65]),xys-y[65],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[66]),xys-y[66],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[67]),xys-y[67],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[68]),xys-y[68],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[69]),xys-y[69],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[70]),xys-y[70],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[71]),xys-y[71],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[72]),xys-y[72],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[73]),xys-y[73],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[74]),xys-y[74],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[75]),xys-y[75],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[76]),xys-y[76],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[77]),xys-y[77],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[78]),xys-y[78],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[79]),xys-y[79],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[80]),xys-y[80],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[81]),xys-y[81],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[82]),xys-y[82],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[83]),xys-y[83],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[84]),xys-y[84],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[85]),xys-y[85],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[86]),xys-y[86],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[87]),xys-y[87],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[88]),xys-y[88],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[89]),xys-y[89],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[90]),xys-y[90],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[91]),xys-y[91],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[92]),xys-y[92],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[93]),xys-y[93],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[94]),xys-y[94],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[95]),xys-y[95],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[96]),xys-y[96],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[97]),xys-y[97],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[98]),xys-y[98],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-x[99]),xys-y[99],3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe,xys,500,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    xs=axis(xxs,xys,xxe,xye);
    ys=axis(yxs,yys,yxe,yye);
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[0]),xys-bya[0],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[1]),xys-bya[1],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[2]),xys-bya[2],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[3]),xys-bya[3],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[4]),xys-bya[4],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[5]),xys-bya[5],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[6]),xys-bya[6],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[7]),xys-bya[7],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[8]),xys-bya[8],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[9]),xys-bya[9],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[10]),xys-bya[10],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[11]),xys-bya[11],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[12]),xys-bya[12],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[13]),xys-bya[13],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[14]),xys-bya[14],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[15]),xys-bya[15],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[16]),xys-bya[16],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[17]),xys-bya[17],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[18]),xys-bya[18],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(yxe-(-bxa[19]),xys-bya[19],8,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function animate(){
    addEventListener("mousedown",moveline=()=>{
    direction();
    allpoint();
    })
}
animate();