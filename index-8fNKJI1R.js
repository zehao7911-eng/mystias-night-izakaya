(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const l={design:{width:720,height:1280},customer:{maxQueue:4,spawnDuration:.4,basePatience:26,spawnIntervalBase:10},seat:{baseEatTime:6,drinkMax:3,drinkConsumeRate:.4,pourDuration:.2},economy:{baseGoldPerCustomer:30,xpGainSatisfied:15,xpLossFailed:20,starMax:5,starLossAngry:.4,starLossWrong:.15,starRecoveryRate:.5/60,xpRequired:o=>Math.round(200*Math.pow(o,1.7)+250)},rarity:{COMMON:{label:"Youkai",mult:1,patience:1},GHOST:{label:"Ghost",mult:1.2,patience:.85},VIP:{label:"VIP",mult:2.5,patience:1.3},HEAVY:{label:"Drinker",mult:2,patience:.9,dualRefill:!0}},seats:[{id:"slot_01",type:"BBQ",label:"BBQ Grill",description:"Grilled Lamprey",unlocked:!0,unlockCost:0,color:"#c0602a",accentColor:"#ff9944"},{id:"slot_02",type:"ODEN",label:"Oden Pot",description:"Oden Stew",unlocked:!1,unlockCost:300,color:"#7a4020",accentColor:"#cc8844"},{id:"slot_03",type:"STEAM",label:"Steamer",description:"Dumplings",unlocked:!1,unlockCost:600,color:"#204860",accentColor:"#88ccdd"},{id:"slot_04",type:"SAKE",label:"Sake Counter",description:"Premium Sake",unlocked:!1,unlockCost:1e3,color:"#602060",accentColor:"#dd88cc"}],seatGrid:[{x:0,y:605,w:180,h:100},{x:180,y:605,w:180,h:100},{x:360,y:605,w:180,h:100},{x:540,y:605,w:180,h:100}],queueSlots:[{x:90,y:1215},{x:270,y:1215},{x:450,y:1215},{x:630,y:1215}],upgrades:{singing:{name:"Mystia's Singing",maxLevel:5,costs:[100,200,350,500,999999],desc:"Attracts more customers faster",effectLabel:o=>o>0?`-${o*15}% spawn interval`:"Not purchased"},tatami:{name:"Cozy Tatami Mats",maxLevel:5,costs:[60,120,200,300,999999],desc:"Guests feel more comfortable waiting",effectLabel:o=>o>0?`+${o*20}% patience`:"Not purchased"},tipbox:{name:"Offerings Tip Box",maxLevel:5,costs:[90,180,300,500,999999],desc:"Happy guests leave generous tips",effectLabel:o=>o>0?`+${o*25}% coins`:"Not purchased"},autopourer:{name:"Kappa Auto Pourer",maxLevel:3,costs:[150,300,500],desc:"Automates sake refill",effectLabel:o=>o>0?`Auto-refill in ${[2.5,1.5,.5][o-1]}s`:"Not purchased"},charcoal:{name:"Hakurei Blessed Charcoal",maxLevel:4,costs:[120,220,380,600],desc:"Guests eat and drink faster",effectLabel:o=>o>0?`+${o*15}% eating speed`:"Not purchased"}},venues:{shrine_road:{name:"Hakurei Shrine Road Cart",cost:0,owned:!0,desc:"Warm lanterns add +20% starting patience to all guests"},night_market:{name:"Human Village Nightmarket",cost:400,desc:"High tolerance crowd: star reputation recovers 3× faster"},bamboo_forest:{name:"Misty Bamboo Forest Stall",cost:600,desc:"35% chance guests order a second round (+40% gold)"},tavern_ext:{name:"Geidontei Tavern Extension",cost:850,desc:"Unlocks Heavy Drinker elites: 2× pay, needs dual sake refills"},blessing_stage:{name:"Moria Blessing Stage",cost:1500,desc:"Divine VIP guests appear with 3× base gold output"}}},G="mni_save_v3";function Y(){return{coins:0,xp:0,level:1,stars:l.economy.starMax,upgrades:{singing:0,tatami:0,tipbox:0,autopourer:0,charcoal:0},venues:{shrine_road:!0,night_market:!1,bamboo_forest:!1,tavern_ext:!1,blessing_stage:!1},seats:{slot_01:!0,slot_02:!1,slot_03:!1,slot_04:!1},totalServed:0,totalCoins:0}}class Q{constructor(){this._s=Y(),this.load(),this._listeners=[]}get coins(){return this._s.coins}get xp(){return this._s.xp}get level(){return this._s.level}get stars(){return this._s.stars}get upgrades(){return this._s.upgrades}get venues(){return this._s.venues}get seats(){return this._s.seats}get totalServed(){return this._s.totalServed}xpRequired(){return l.economy.xpRequired(this._s.level)}get spawnRateMult(){return 1-this._s.upgrades.singing*.15}get patienceMult(){return 1+this._s.upgrades.tatami*.2+(this._s.venues.shrine_road?.2:0)}get tipMult(){return 1+this._s.upgrades.tipbox*.25}get autoPourInterval(){const e=this._s.upgrades.autopourer;return e>0?[2.5,1.5,.5][e-1]:null}get eatSpeedMult(){return 1+this._s.upgrades.charcoal*.15}get starRecoveryMult(){return this._s.venues.night_market?3:1}get afterpartyChance(){return this._s.venues.bamboo_forest?.35:0}get heavyDrinkerUnlocked(){return this._s.venues.tavern_ext}get blessingStageUnlocked(){return this._s.venues.blessing_stage}addCoins(e){this._s.coins+=e,this._s.totalCoins+=e,this._notify("coins")}spendCoins(e){return this._s.coins<e?!1:(this._s.coins-=e,this._notify("coins"),!0)}addXp(e){for(this._s.xp+=e;this._s.xp>=this.xpRequired()&&this._s.level<10;)this._s.xp-=this.xpRequired(),this._s.level++,this._notify("levelup");this._notify("xp")}loseXp(e){this._s.xp=Math.max(0,this._s.xp-e),this._notify("xp")}changeStars(e){this._s.stars=Math.max(0,Math.min(l.economy.starMax,this._s.stars+e)),this._notify("stars")}upgradeLevel(e){return this._s.upgrades[e]??0}purchaseUpgrade(e){const s=l.upgrades[e];if(!s)return!1;const t=this._s.upgrades[e];return t>=s.maxLevel||!this.spendCoins(s.costs[t])?!1:(this._s.upgrades[e]++,this._notify("upgrade"),this.save(),!0)}purchaseVenue(e){const s=l.venues[e];return!s||s.owned||this._s.venues[e]||!this.spendCoins(s.cost)?!1:(this._s.venues[e]=!0,this._notify("venue"),this.save(),!0)}unlockSeat(e){const s=l.seats.find(t=>t.id===e);return!s||this._s.seats[e]||!this.spendCoins(s.unlockCost)?!1:(this._s.seats[e]=!0,this._notify("seat"),this.save(),!0)}incrementServed(){this._s.totalServed++}onChange(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(s=>s!==e)}}_notify(e){this._listeners.forEach(s=>s(e,this))}save(){try{localStorage.setItem(G,JSON.stringify(this._s))}catch{}}load(){try{const e=localStorage.getItem(G);e&&Object.assign(this._s,JSON.parse(e))}catch{}}reset(){this._s=Y();try{localStorage.removeItem(G)}catch{}this._notify("reset")}}const f={SPAWNING:"SPAWNING",WAITING:"WAITING",DRAGGING:"DRAGGING",WRONG_ORDER:"WRONG_ORDER",LEAVING_SATISFIED:"LEAVING_SATISFIED",LEAVING_ANGRY:"LEAVING_ANGRY"},j={BBQ:{body:"#cc6633",accent:"#ff9955",skin:"#ffd5aa"},ODEN:{body:"#8844aa",accent:"#cc77ee",skin:"#ffddee"},STEAM:{body:"#3366aa",accent:"#66aadd",skin:"#ddeeff"},SAKE:{body:"#aa3366",accent:"#ee6699",skin:"#ffddee"}},K=["COMMON","COMMON","COMMON","GHOST","GHOST"];let J=1;function Z(o){const e=[...K];return o.level>=4&&o.blessingStageUnlocked&&e.push("VIP"),o.level>=3&&o.heavyDrinkerUnlocked&&e.push("HEAVY"),e[Math.floor(Math.random()*e.length)]}function ee(o){const e=l.seats.filter(s=>o.seats[s.id]).map(s=>s.type);return e[Math.floor(Math.random()*e.length)]}function te(o,e,s){const t=l.queueSlots[o];let i;return s==="VIP"?i=0:s==="GHOST"?i=1:s==="HEAVY"?i=3:i=o%3+1,{id:J++,state:f.SPAWNING,slot:o,type:e,rarity:s,spriteCol:i,x:t.x,y:t.y+160,targetX:t.x,targetY:t.y,colors:j[e],patience:0,maxPatience:0,alpha:0,spawnProgress:0,leaveProgress:0,wrongTimer:0,hopPhase:Math.random()*Math.PI*2,isBeingDragged:!1}}class se{constructor(e){this.gs=e,this.customers=[],this.spawnTimer=4,this._onSeated=null,this._onAngry=null}onSeated(e){this._onSeated=e}onAngry(e){this._onAngry=e}get waitingCount(){return this.customers.filter(e=>e.state===f.WAITING||e.state===f.WRONG_ORDER).length}_freeSlots(){const e=new Set(this.customers.filter(s=>s.state!==f.LEAVING_SATISFIED&&s.state!==f.LEAVING_ANGRY).map(s=>s.slot));return Array.from({length:l.customer.maxQueue},(s,t)=>t).filter(s=>!e.has(s))}_spawnInterval(){return l.customer.spawnIntervalBase*this.gs.spawnRateMult}_patience(){const e=this.gs.level,s=l.customer.basePatience,t=1+.2*e,i=this.gs.patienceMult;return s*i/t}spawnCustomer(){const e=this._freeSlots();if(e.length===0)return;const s=e[Math.floor(Math.random()*e.length)],t=ee(this.gs);if(!t)return;const i=Z(this.gs),a=te(s,t,i),n=this._patience()*l.rarity[i].patience;a.patience=n,a.maxPatience=n,this.customers.push(a)}startDrag(e){const s=this.customers.find(t=>t.id===e);return!s||s.state!==f.WAITING?!1:(s.state=f.DRAGGING,s.isBeingDragged=!0,!0)}cancelDrag(e){const s=this.customers.find(t=>t.id===e);s&&(s.state=f.WAITING,s.isBeingDragged=!1)}wrongOrder(e){const s=this.customers.find(t=>t.id===e);s&&(s.state=f.WRONG_ORDER,s.isBeingDragged=!1,s.wrongTimer=.5,s.patience-=s.maxPatience*.2,s.patience<=0&&(s.state=f.LEAVING_ANGRY,s.leaveProgress=0))}removeFromQueue(e){const s=this.customers.findIndex(t=>t.id===e);s!==-1&&this.customers.splice(s,1)}customerSatisfied(e){}update(e){this.spawnTimer-=e,this.spawnTimer<=0&&(this.customers.filter(s=>s.state!==f.LEAVING_SATISFIED&&s.state!==f.LEAVING_ANGRY).length<l.customer.maxQueue&&this.spawnCustomer(),this.spawnTimer=this._spawnInterval());for(let s=this.customers.length-1;s>=0;s--){const t=this.customers[s];this._updateCustomer(t,e),t.leaveProgress>=1&&this.customers.splice(s,1)}}_updateCustomer(e,s){switch(e.state){case f.SPAWNING:e.spawnProgress+=s/l.customer.spawnDuration,e.alpha=e.spawnProgress,e.y=e.targetY+(1-e.spawnProgress)*110,e.spawnProgress>=1&&(e.spawnProgress=1,e.alpha=1,e.y=e.targetY,e.state=f.WAITING);break;case f.WAITING:e.patience-=s,e.patience<=0&&(e.patience=0,e.state=f.LEAVING_ANGRY,this.gs.changeStars(-.4),this.gs.loseXp(l.economy.xpLossFailed),this._onAngry&&this._onAngry(e));break;case f.DRAGGING:break;case f.WRONG_ORDER:e.wrongTimer-=s,e.wrongTimer<=0&&(e.state=f.WAITING,e.wrongTimer=0);break;case f.LEAVING_ANGRY:e.leaveProgress+=s/.6,e.alpha=1-e.leaveProgress,e.y=e.targetY+e.leaveProgress*70;break}}getCustomerAtDesignPos(e,s,t=52){for(const i of this.customers)if(i.state===f.WAITING&&Math.hypot(i.x-e,i.y-s)<t)return i;return null}getFirstWaitingOfType(e){return this.customers.find(s=>s.state===f.WAITING&&s.type===e)||null}getDraggingCustomer(){return this.customers.find(e=>e.state===f.DRAGGING)}dispose(){this.customers=[]}}const m={EMPTY:"EMPTY",OCCUPIED:"OCCUPIED"};function ie(o){return{id:o.id,type:o.type,label:o.label,description:o.description,color:o.color,accentColor:o.accentColor,unlockCost:o.unlockCost,state:m.EMPTY,customer:null,eatProgress:0,eatDuration:0,drinkLevel:0,drinkTimer:0,pourTimer:0,autoTimer:0,wobbleTimer:0,afterpartyPending:!1}}class ae{constructor(e){this.gs=e,this.seats=l.seats.map(ie),this._onDone=null}onDone(e){this._onDone=e}isUnlocked(e){return!!this.gs.seats[e]}get(e){return this.seats.find(s=>s.id===e)}seatCustomer(e,s){const t=this.get(e);if(!t||!this.isUnlocked(e)||t.state!==m.EMPTY||t.type!==s.type)return!1;l.rarity[s.rarity]?.patience;const i=l.seat.baseEatTime,a=this.gs.eatSpeedMult;return t.state=m.OCCUPIED,t.customer={...s},t.eatProgress=0,t.eatDuration=i/a,t.drinkLevel=l.seat.drinkMax,t.drinkTimer=0,t.autoTimer=0,t.afterpartyPending=!1,!0}tapSeat(e){const s=this.get(e);return!s||s.state!==m.OCCUPIED||s.drinkLevel>=l.seat.drinkMax?!1:(s.pourTimer=l.seat.pourDuration,s.drinkLevel=l.seat.drinkMax,s.customer?.rarity==="HEAVY"&&(s.drinkLevel=l.seat.drinkMax),!0)}getSeatAtDesignPos(e,s){const t=l.seatGrid;for(let i=0;i<this.seats.length;i++){const a=t[i];if(e>=a.x&&e<=a.x+a.w&&s>=a.y&&s<=a.y+a.h)return this.seats[i]}return null}getDiningAreaSeat(e){const s=l.design.width/this.seats.length,t=Math.min(this.seats.length-1,Math.max(0,Math.floor(e/s)));return this.seats[t]??null}update(e){const s=this.gs.autoPourInterval;for(const t of this.seats){if(!this.isUnlocked(t.id)||t.state!==m.OCCUPIED)continue;if(t.pourTimer>0&&(t.pourTimer-=e,t.pourTimer<=0&&(t.pourTimer=0)),s!==null&&t.drinkLevel<l.seat.drinkMax&&(t.autoTimer+=e,t.autoTimer>=s&&(t.autoTimer=0,t.drinkLevel=l.seat.drinkMax,t.pourTimer=.2)),t.drinkLevel<=0)t.wobbleTimer+=e;else if(t.drinkTimer+=e,t.drinkTimer>=1&&(t.drinkTimer-=1,Math.random()<l.seat.drinkConsumeRate&&(t.drinkLevel=Math.max(0,t.drinkLevel-1))),t.eatProgress+=e/t.eatDuration,t.eatProgress>=1){this._completeSeat(t);continue}}}_completeSeat(e){const s=e.customer;e.state=m.EMPTY,e.customer=null,e.eatProgress=0,e.drinkLevel=0,e.pourTimer=0,e.autoTimer=0,e.wobbleTimer=0,this._onDone&&this._onDone(e,s,!0)}dispose(){}}class ne{constructor(e,s){this.canvas=e,this.toDesign=s,this.state={dragging:!1,customer:null,x:0,y:0,pointerId:null},this._onDrop=null,this._onCancel=null,this._onPickup=null,this._bindEvents()}onPickup(e){this._onPickup=e}onDrop(e){this._onDrop=e}onCancel(e){this._onCancel=e}startDrag(e,s,t,i){const a=this.toDesign(s,t);this.state.dragging=!0,this.state.customer=e,this.state.x=a.x,this.state.y=a.y,this.state.pointerId=i,this._onPickup&&this._onPickup(e)}_bindEvents(){this._onPointerMove=e=>{if(!this.state.dragging||e.pointerId!==this.state.pointerId)return;const s=this.toDesign(e.clientX,e.clientY);this.state.x=s.x,this.state.y=s.y},this._onPointerUp=e=>{if(!this.state.dragging||e.pointerId!==this.state.pointerId)return;const s=this.toDesign(e.clientX,e.clientY);this._onDrop&&this._onDrop(this.state.customer,s.x,s.y),this._endDrag()},this._onPointerCancel=e=>{!this.state.dragging||e.pointerId!==this.state.pointerId||(this._onCancel&&this._onCancel(this.state.customer),this._endDrag())},this.canvas.addEventListener("pointermove",this._onPointerMove),this.canvas.addEventListener("pointerup",this._onPointerUp),this.canvas.addEventListener("pointercancel",this._onPointerCancel)}_endDrag(){this.state.dragging=!1,this.state.customer=null,this.state.pointerId=null}dispose(){this.canvas.removeEventListener("pointermove",this._onPointerMove),this.canvas.removeEventListener("pointerup",this._onPointerUp),this.canvas.removeEventListener("pointercancel",this._onPointerCancel)}}const oe=380;class re{constructor(e){this.gs=e,this.particles=[],this._onWrong=null}onWrong(e){this._onWrong=e}rewardSatisfied(e,s){const t=this.gs,i=l.rarity[s.rarity]?.mult??1,a=t.tipMult,n=t.afterpartyChance>0&&Math.random()<t.afterpartyChance,h=n?1.4:1,r=Math.floor(l.economy.baseGoldPerCustomer*i*a*h),d=Math.round(l.economy.xpGainSatisfied*i);t.addCoins(r),t.addXp(d),t.changeStars(.1),t.incrementServed(),t.save();const c=l.seats.findIndex(w=>w.id===e.id),p=l.seatGrid[c],u=p.x+p.w/2,g=p.y+p.h/3;this.particles.push({type:"TEXT",x:u,y:g-20,text:`+¥${r}`,alpha:1,vy:-70,life:1.5,maxLife:1.5,color:i>=2?"#ff9900":"#ffd700",size:i>=2?28:22});const S=10+Math.floor(i*3);for(let w=0;w<S;w++){const k=w/S*Math.PI*2-Math.PI/2+(Math.random()-.5)*.6,x=120+Math.random()*140;this.particles.push({type:"COIN",x:u+(Math.random()-.5)*30,y:g,vx:Math.cos(k)*x,vy:Math.sin(k)*x-60,rot:Math.random()*Math.PI*2,rotV:(Math.random()-.5)*10,spin:Math.random()*Math.PI*2,spinV:(Math.random()-.5)*12,alpha:1,life:1+Math.random()*.5,maxLife:1.5,color:Math.random()<.6?"#ffd700":"#ffaa00",gravity:!0})}const C=["#ffaabb","#ff88bb","#ffccdd","#ffbbcc","#ff99aa"];for(let w=0;w<8;w++){const k=w/8*Math.PI*2,x=50+Math.random()*80;this.particles.push({type:"PETAL",x:u+(Math.random()-.5)*60,y:g-20,vx:Math.cos(k)*x+(Math.random()-.5)*30,vy:Math.sin(k)*x-80,rot:Math.random()*Math.PI*2,rotV:(Math.random()-.5)*4,alpha:.9,life:1.4+Math.random()*.6,maxLife:2,color:C[Math.floor(Math.random()*C.length)],gravity:!0,gravityScale:.35})}n&&this.particles.push({type:"TEXT",x:u,y:g-55,text:"Afterparty! +40%",alpha:1,vy:-40,life:1.3,maxLife:1.3,color:"#ff66bb",size:16})}penalizeAngry(e){this.gs.loseXp(l.economy.xpLossFailed),this.gs.changeStars(-.4)}penalizeWrong(e,s,t){this.gs.changeStars(-.15);const i=s??l.queueSlots[e.slot]?.x??360,a=t??l.queueSlots[e.slot]?.y??600;this.particles.push({type:"TEXT",x:i,y:a-30,text:"Wrong Counter!",alpha:1,vy:-35,life:1.1,maxLife:1.1,color:"#ff3333",size:18});for(let n=0;n<6;n++){const h=n/6*Math.PI*2,r=25+Math.random()*20;this.particles.push({type:"SMOKE",x:i+Math.cos(h)*r*.3,y:a+Math.sin(h)*r*.3,vx:Math.cos(h)*40,vy:Math.sin(h)*40-30,alpha:.75,life:.7+Math.random()*.3,maxLife:1,radius:8+Math.random()*8,color:`rgba(${100+Math.floor(Math.random()*40)}, 0, ${180+Math.floor(Math.random()*40)}, 0.7)`})}}update(e){for(let s=this.particles.length-1;s>=0;s--){const t=this.particles[s];if(t.life-=e,t.vx!==void 0&&(t.x+=t.vx*e),t.vy!==void 0&&(t.y+=t.vy*e),t.gravity){const i=oe*(t.gravityScale??1);t.vy!==void 0&&(t.vy+=i*e)}t.rot!==void 0&&t.rotV!==void 0&&(t.rot+=t.rotV*e),t.spin!==void 0&&t.spinV!==void 0&&(t.spin+=t.spinV*e),t.type==="COIN"&&t.vx&&(t.vx*=1-e*1.5),t.alpha=Math.max(0,t.life/(t.maxLife??1.4)),t.life<=0&&this.particles.splice(s,1)}}dispose(){this.particles=[]}}const le="./background.webp",de="./customers.webp",he="./food-icons.webp",ce="./dining-food.webp",pe="./dining-zone.webp",ue=605,M=648,fe=466,P=605,R=[{x:105,y:488},{x:278,y:470},{x:448,y:470},{x:618,y:488}],ge=4,me=3,N=1080/ge,O=810/me,T={BBQ:0,ODEN:1,STEAM:2,SAKE:3};function be(o){return o>.69?0:o>.29?1:2}const _e=4,D=1080/_e,V=607,U={BBQ:0,ODEN:1,STEAM:2,SAKE:3},B={BBQ:"#ff6622",ODEN:"#bb66ee",STEAM:"#44aacc",SAKE:"#ee4488"},H=["#d4a044","#cc8822","#e8cc88","#bb9933"];class ye{constructor(e,s,t,i,a,n,h,r){this.canvas=e,this.ctx=s,this.viewport=t,this.gs=i,this.seats=a,this.customers=n,this.drag=h,this.rewards=r,this._time=0,this._assets={bg:new Image,chars:new Image,food:new Image},this._assetsLoaded=0,this._assetsReady=!1,this._loadAssets(),this._shakeTimer=0,this._shakeIntensity=0,this._shakeX=0,this._shakeY=0,this._dragScale=1,this._dragScaleVel=0,this._feathers=[],this._pourAnims=new Map,this._embers=[],this._emberTimer=0,this._tutorialDone=!!localStorage.getItem("mni_tutorial_v1"),this._tutorialDelay=2,this.hoverSeatId=null}_loadAssets(){const e=()=>{this._assetsLoaded++,this._assetsLoaded>=3&&(this._assetsReady=!0)};this._assets.dining=new Image,this._assets.diningBg=new Image,this._assets.dining.crossOrigin="anonymous",this._assets.diningBg.crossOrigin="anonymous",this._assets.dining.src=ce,this._assets.diningBg.src=pe,[[this._assets.bg,le],[this._assets.chars,de],[this._assets.food,he]].forEach(([s,t])=>{s.crossOrigin="anonymous",s.onload=e,s.onerror=e,s.src=t})}triggerScreenShake(e=2,s=.15){this._shakeTimer=s,this._shakeIntensity=e}triggerPour(e){this._pourAnims.set(e,{timer:.5,maxTimer:.5})}onPickup(){this._dragScale=.6,this._dragScaleVel=0}draw(e){this._time+=e,this._updateSpring(e),this._updateFeathers(e),this._updateShake(e),this._updateEmbers(e);const s=this.ctx,t=this.canvas.width,i=this.canvas.height,a=l.design.width,n=t/a;if(s.save(),s.translate(this._shakeX*n,this._shakeY*n),s.fillStyle="#0a0502",s.fillRect(0,0,t,i),s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",this._assets.bg.complete&&this._assets.bg.naturalWidth>0){const h=Math.round(t*l.design.height/l.design.width);s.drawImage(this._assets.bg,0,0,t,h)}else this._drawFallbackBg(s,t,i);this._drawAmbientLanterns(s,n),s.save(),s.scale(n,n),s.imageSmoothingEnabled=!1,this._drawSeatOverlays(s),this._drawCharacterShadows(s),this._drawDiningScenes(s),this._drawSeatedCustomers(s),this._drawPostCharOverlays(s),this._drawPourAnimations(s,e),this._drawHoverHighlight(s),this._drawWaitingZone(s),this._drawQueue(s),this._drawDragGhost(s),this._drawParticles(s),this._drawEmbers(s),this._drawTutorialHint(s,e),s.restore(),this._drawVignette(s,t,i),s.restore()}_drawFallbackBg(e,s,t){const i=e.createLinearGradient(0,0,0,t*.4);i.addColorStop(0,"#050820"),i.addColorStop(1,"#1a0a04"),e.fillStyle=i,e.fillRect(0,0,s,t*.4),e.fillStyle="#1a0a04",e.fillRect(0,t*.4,s,t*.6),e.fillStyle="#3d1800",e.fillRect(0,t*.32,s,t*.12)}_drawSeatOverlays(e){const s=this.seats.seats,t={BBQ:"BBQ 🔥",ODEN:"ODEN 🍲",STEAM:"STEAM 🧆",SAKE:"SAKE 🍶"};l.seatGrid.forEach((i,a)=>{const n=s[a],h=this.gs.seats[n.id],r=i.x+i.w/2,d=fe,c=i.y+i.h/2+8;if(!h){e.fillStyle="rgba(0,0,0,0.45)",e.fillRect(i.x,P,i.w,i.y+i.h-P),e.save(),e.fillStyle="rgba(55,25,5,0.95)",this._roundRect(e,r-52,c-24,104,48,6),e.fill(),e.strokeStyle="#9b5a10",e.lineWidth=2,this._roundRect(e,r-52,c-24,104,48,6),e.stroke(),e.strokeStyle="rgba(200,140,60,0.3)",e.lineWidth=1,this._roundRect(e,r-48,c-20,96,40,4),e.stroke(),e.fillStyle="#ffbb55",e.font="700 12px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText("🔒 ¥"+n.unlockCost,r,c-6),e.fillStyle="rgba(255,190,90,0.75)",e.font="10px monospace",e.fillText(t[n.type]||n.type,r,c+10),e.restore();return}if(n.state===m.EMPTY){const p=B[n.type]||"#ffaa44";e.save(),e.fillStyle="rgba(10,4,0,0.78)",this._roundRect(e,r-40,d-13,80,26,4),e.fill(),e.strokeStyle=p,e.lineWidth=1.2,this._roundRect(e,r-40,d-13,80,26,4),e.stroke(),e.fillStyle=p,e.font="700 10px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(t[n.type]||n.type,r,d),e.restore()}if(n.state===m.OCCUPIED){this._drawDrinkIndicator(e,r+16,M-62,n.drinkLevel);const p=B[n.type]||"#ffaa44";e.save(),e.globalAlpha=.55,e.fillStyle=p,e.font="10px monospace",e.textAlign="left",e.textBaseline="middle",e.fillText(t[n.type]||n.type,i.x+4,d-6),e.restore()}})}_drawPostCharOverlays(e){const s=this.seats.seats;l.seatGrid.forEach((t,i)=>{const a=s[i];if(a.state!==m.OCCUPIED)return;const n=t.x+t.w/2;this._drawSatisfactionRing(e,n,M,a.eatProgress),a.drinkLevel===0&&this._drawRefillPrompt(e,n,M-90)})}_drawSatisfactionRing(e,s,t,i){if(e.save(),e.lineWidth=8,e.strokeStyle="rgba(0,0,0,0.35)",e.beginPath(),e.arc(s,t,52,0,Math.PI*2),e.stroke(),i>0){const n=-Math.PI/2,h=n+Math.PI*2*i,r=`hsl(${120-i*40}, 80%, 50%)`;e.strokeStyle=r,e.shadowColor=r,e.shadowBlur=10,e.beginPath(),e.arc(s,t,52,n,h),e.stroke(),e.shadowBlur=0}e.restore()}_drawDrinkIndicator(e,s,t,i){e.save(),e.font="12px serif",e.textAlign="left",e.textBaseline="top";for(let a=0;a<l.seat.drinkMax;a++)e.globalAlpha=a<i?1:.25,e.fillText("🍶",s,t+a*16);e.globalAlpha=1,e.restore()}_drawSeatedCustomers(e){const s=this.seats.seats;l.seatGrid.forEach((t,i)=>{const a=s[i];if(a.state!==m.OCCUPIED||!a.customer)return;const n=t.x+t.w/2;this._drawCharSprite(e,a.customer.spriteCol??T[a.customer.type]??0,0,n,M,108)})}_drawCharSprite(e,s,t,i,a,n){if(!this._assets.chars.complete||this._assets.chars.naturalWidth===0){this._drawFallbackChar(e,s,i,a,n);return}const r=(typeof s=="number"?s:T[s]??0)*N,d=t*O,c=N/O,p=n,u=n*c;e.drawImage(this._assets.chars,r,d,N,O,i-u/2,a-p/2,u,p)}_drawFallbackChar(e,s,t,i,a){const n={BBQ:"#c85020",ODEN:"#7733aa",STEAM:"#2255aa",SAKE:"#aa2255"};e.save(),e.fillStyle=n[s]||"#555",e.beginPath(),e.arc(t,i,a/2,0,Math.PI*2),e.fill(),e.restore()}_drawRefillPrompt(e,s,t){const i=Math.sin(this._time*2.8)*5,a=t+i;e.save(),e.fillStyle="rgba(255,200,80,0.93)",this._roundRect(e,s-52,a-14,104,28,5),e.fill(),e.strokeStyle="#cc6600",e.lineWidth=1.5,this._roundRect(e,s-52,a-14,104,28,5),e.stroke(),e.fillStyle="#7a2800",e.font="700 11px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText("🍶 Tap to Refill!",s,a),e.restore()}_drawPourAnimations(e,s){for(const[t,i]of this._pourAnims){if(i.timer-=s,i.timer<=0){this._pourAnims.delete(t);continue}const a=l.seats.findIndex(c=>c.id===t);if(a<0)continue;const n=l.seatGrid[a],h=n.x+n.w/2,r=1-i.timer/i.maxTimer;e.save(),e.globalAlpha=1-r,e.save(),e.translate(h,P+50),e.rotate(-(r*Math.PI*.4)),e.font="26px serif",e.textAlign="center",e.textBaseline="middle",e.fillText("🍶",0,0),e.restore();const d=4;for(let c=0;c<d;c++){const p=(r+c/d)%1,u=h+(c-1.5)*8,g=P+50+p*55;e.fillStyle="rgba(240,210,120,0.8)",e.beginPath(),e.ellipse(u,g,3,6,0,0,Math.PI*2),e.fill()}e.globalAlpha=Math.max(0,1-r*2),e.fillStyle="#ffe060",e.font="700 16px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText("Pour!",h,n.y+35-r*50),e.restore()}}_drawHoverHighlight(e){if(!this.drag.state.dragging||!this.hoverSeatId)return;const s=l.seats.findIndex(r=>r.id===this.hoverSeatId);if(s<0)return;const t=l.seatGrid[s],i=this.seats.seats[s],a=this.gs.seats[i.id],n=this.drag.state.customer,h=a&&i.state===m.EMPTY&&n&&i.type===n.type;e.save(),e.strokeStyle=h?"#44ff88":"#ff4444",e.lineWidth=3,e.shadowColor=h?"#44ff88":"#ff4444",e.shadowBlur=14,e.setLineDash([8,6]),e.lineDashOffset=-this._time*40,e.strokeRect(t.x+2,t.y+2,t.w-4,t.h-4),e.setLineDash([]),e.restore()}_drawWaitingZone(e){const s=l.design.width,t=985,i=295;e.save(),e.fillStyle="rgba(0,0,0,0.30)",e.fillRect(0,t,s,i);const a=e.createLinearGradient(0,t,0,t+48);a.addColorStop(0,"rgba(0,0,0,0.50)"),a.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=a,e.fillRect(0,t,s,48),e.strokeStyle="rgba(160,90,20,0.55)",e.lineWidth=2,e.beginPath(),e.moveTo(0,t+2),e.lineTo(s,t+2),e.stroke(),l.queueSlots.forEach(n=>{const h=n.x,r=n.y,d=e.createRadialGradient(h,r+38,0,h,r+38,72);d.addColorStop(0,"rgba(210,110,25,0.22)"),d.addColorStop(.5,"rgba(180,80,10,0.10)"),d.addColorStop(1,"rgba(180,80,10,0)"),e.fillStyle=d,e.beginPath(),e.ellipse(h,r+38,72,45,0,0,Math.PI*2),e.fill(),this._drawCushion(e,h,r+52)}),e.restore()}_drawCushion(e,s,t){e.save(),e.fillStyle="rgba(0,0,0,0.38)",e.beginPath(),e.ellipse(s,t+4,30,7,0,0,Math.PI*2),e.fill(),e.fillStyle="#4a1e06",e.beginPath(),e.ellipse(s,t,30,9,0,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(160,90,30,0.55)",e.lineWidth=2,e.beginPath(),e.ellipse(s,t-2,18,4,0,0,Math.PI),e.stroke(),e.strokeStyle="rgba(130,70,20,0.45)",e.lineWidth=1.5,e.beginPath(),e.ellipse(s,t,30,9,0,0,Math.PI*2),e.stroke(),e.restore()}_drawQueue(e){this.customers.customers.forEach(t=>{if(t.state===f.DRAGGING||t.state==="DINING"||t.state===f.LEAVING_SATISFIED||t.state===f.LEAVING_ANGRY||!l.queueSlots[t.slot])return;const a=t.x,n=t.y,h=t.maxPatience>0?Math.max(0,t.patience/t.maxPatience):1,r=be(h),d=118,c=t.alpha??1;e.save(),e.globalAlpha=c,this._drawCharSprite(e,t.spriteCol??T[t.type]??0,r,a,n,d),this._drawThoughtBubble(e,t.type,a,n,d),e.restore(),this._drawPatienceRing(e,a,n-d/2-22,h,c)})}_drawThoughtBubble(e,s,t,i,a){const d=t+a*.22-22,c=i-a*.45;if(e.save(),e.fillStyle="rgba(255,252,225,0.93)",this._roundRect(e,d,c,44,38,5),e.fill(),e.strokeStyle="#cc8800",e.lineWidth=1.5,this._roundRect(e,d,c,44,38,5),e.stroke(),this._assets.food.complete&&this._assets.food.naturalWidth>0){const u=(U[s]??0)*D;e.imageSmoothingEnabled=!0,e.drawImage(this._assets.food,u,0,D,V,d+5,c+4,34,30)}else{const p={BBQ:"🍖",ODEN:"🍲",STEAM:"🥢",SAKE:"🍶"};e.font="18px serif",e.textAlign="center",e.textBaseline="middle",e.fillStyle="#333",e.fillText(p[s]||"?",d+44/2,c+38/2)}e.restore()}_drawPatienceBar(e,s,t,i){e.save(),e.fillStyle="rgba(0,0,0,0.5)",this._roundRect(e,s-64/2,t,64,8,2),e.fill();const h=Math.min(255,Math.round(255*(1-i)*2)),r=Math.min(255,Math.round(255*i*2));e.fillStyle=`rgb(${h},${r},30)`,i>0&&(this._roundRect(e,s-64/2,t,64*i,8,2),e.fill()),e.restore()}_drawPatienceRing(e,s,t,i,a=1){if(e.save(),e.globalAlpha=a,e.lineWidth=4,e.strokeStyle="rgba(0,0,0,0.38)",e.beginPath(),e.arc(s,t,18,0,Math.PI*2),e.stroke(),i>0){const r=-Math.PI/2,d=r+Math.PI*2*i;let c;if(i>.65)c="#44ee66";else if(i>.3)c="#ffcc22";else{const p=.6+Math.sin(this._time*8)*.4;e.globalAlpha=a*p,c="#ff3322"}e.strokeStyle=c,e.shadowColor=c,e.shadowBlur=8,e.beginPath(),e.arc(s,t,18,r,d),e.stroke(),e.shadowBlur=0}e.restore()}_drawDragGhost(e){if(!this.drag.state.dragging||!this.drag.state.customer)return;const{x:s,y:t,customer:i}=this.drag.state,a=100*this._dragScale;e.save(),e.globalAlpha=.88,e.shadowColor=B[i.type]||"#ffaa44",e.shadowBlur=24,this._drawCharSprite(e,i.spriteCol??T[i.type]??0,0,s,t,a),e.shadowBlur=0,e.restore(),Math.random()<.4&&this._feathers.push({x:s+(Math.random()-.5)*20,y:t+(Math.random()-.5)*20,vx:(Math.random()-.5)*80,vy:(Math.random()-.5)*60-20,life:1,rot:Math.random()*Math.PI*2,rotV:(Math.random()-.5)*4,color:H[Math.floor(Math.random()*H.length)]})}_drawParticles(e){this.rewards.particles.forEach(t=>{t.life<=0||(e.save(),e.globalAlpha=Math.max(0,t.alpha??1),t.type==="COIN"?(e.shadowColor="#ffd700",e.shadowBlur=8,e.font="16px serif",e.textAlign="center",e.textBaseline="middle",e.save(),e.translate(t.x,t.y),e.rotate(t.spin??t.rot??0),e.fillStyle=t.color||"#ffd700",e.fillText("🪙",0,0),e.restore()):t.type==="PETAL"?(e.fillStyle=t.color||"#ffaacc",e.save(),e.translate(t.x,t.y),e.rotate(t.rot??0),e.beginPath(),e.ellipse(0,0,(t.size??7)*.55,t.size??7,0,0,Math.PI*2),e.fill(),e.restore()):t.type==="SMOKE"?(e.fillStyle=t.color||"rgba(80,40,120,0.6)",e.beginPath(),e.arc(t.x,t.y,t.radius??10,0,Math.PI*2),e.fill()):t.type==="TEXT"&&(e.font=`700 ${t.size??18}px monospace`,e.fillStyle=t.color||"#ff4444",e.shadowColor="rgba(0,0,0,0.5)",e.shadowBlur=4,e.textAlign="center",e.textBaseline="middle",e.fillText(t.text||"",t.x,t.y)),e.restore())});for(let t=this._feathers.length-1;t>=0;t--){const i=this._feathers[t];e.save(),e.globalAlpha=i.life*.9,e.fillStyle=i.color,e.translate(i.x,i.y),e.rotate(i.rot),e.beginPath(),e.ellipse(0,0,3,7,0,0,Math.PI*2),e.fill(),e.restore()}}_drawAmbientLanterns(e,s){e.save(),e.globalCompositeOperation="screen",R.forEach((t,i)=>{const a=t.x*s,n=t.y*s,h=160*s,r=.14+Math.sin(this._time*1.25+i*1.5)*.04,d=e.createRadialGradient(a,n,0,a,n,h);d.addColorStop(0,`rgba(255,145,45,${(r*1.6).toFixed(3)})`),d.addColorStop(.4,`rgba(255,80,10,${(r*.7).toFixed(3)})`),d.addColorStop(1,"rgba(200,50,0,0)"),e.fillStyle=d,e.beginPath(),e.arc(a,n,h,0,Math.PI*2),e.fill()}),e.restore()}_drawDiningScenes(e){const i={BBQ:0,ODEN:1,STEAM:2,SAKE:3},a=this._assets.dining.complete&&this._assets.dining.naturalWidth>0,n=this.seats.seats;l.seatGrid.forEach((h,r)=>{const d=n[r];if(d.state!==m.OCCUPIED)return;const c=h.x+h.w/2,p=148,u=70,g=c-p/2,S=ue;if(e.save(),e.imageSmoothingEnabled=!0,a){const C=i[d.type]??0;e.drawImage(this._assets.dining,C*270,0,270,607,g,S,p,u)}else this._drawFoodFallback(e,d.type,c,S+u/2);(d.type==="ODEN"||d.type==="STEAM")&&this._drawSteamWisps(e,c,S+8),e.restore()})}_drawFoodFallback(e,s,t,i){const a={BBQ:"#5a1800",ODEN:"#2e1a08",STEAM:"#1a2e18",SAKE:"#12123a"};if(e.fillStyle=a[s]||"#2e1a08",this._roundRect(e,t-46,i-20,92,40,5),e.fill(),e.strokeStyle="rgba(255,180,80,0.3)",e.lineWidth=1,this._roundRect(e,t-46,i-20,92,40,5),e.stroke(),this._assets.food.complete&&this._assets.food.naturalWidth>0){const n=U[s]??0;e.imageSmoothingEnabled=!0,e.drawImage(this._assets.food,n*D,0,D,V,t-24,i-22,48,44)}}_drawSteamWisps(e,s,t){const i=this._time;for(let a=0;a<3;a++){const n=i*1.9+a*1.15,h=Math.sin(n)*7,r=(.12+Math.sin(n*.8)*.07)*Math.max(0,Math.min(1,i)),d=(i*28+a*18)%36;e.save(),e.globalAlpha=Math.max(0,r),e.strokeStyle="rgba(210,220,255,0.9)",e.lineWidth=2,e.lineCap="round";const c=s+(a-1)*13+h,p=t-d+18,u=t-d;e.beginPath(),e.moveTo(c,p),e.quadraticCurveTo(c+5,(p+u)/2,c,u),e.stroke(),e.restore()}}_drawCharacterShadows(e){const s=this.seats.seats;l.seatGrid.forEach((t,i)=>{if(s[i].state!==m.OCCUPIED)return;const n=t.x+t.w/2;this._drawShadowEllipse(e,n,M+54)}),this.customers.customers.forEach(t=>{t.state===f.DRAGGING||t.state==="DINING"||t.state===f.LEAVING_SATISFIED||t.state===f.LEAVING_ANGRY||l.queueSlots[t.slot]&&this._drawShadowEllipse(e,t.x,t.y+59+6)})}_drawShadowEllipse(e,s,t){e.save(),e.globalAlpha=.2,e.fillStyle="#000",e.beginPath(),e.ellipse(s,t,28,7,0,0,Math.PI*2),e.fill(),e.restore()}_updateEmbers(e){if(this._emberTimer+=e,this._emberTimer>=.28&&this._embers.length<14){this._emberTimer=0;const s=R[Math.floor(Math.random()*R.length)],t=2.2+Math.random()*1.4;this._embers.push({x:s.x+(Math.random()-.5)*28,y:s.y+18,vx:(Math.random()-.5)*18,vy:-(18+Math.random()*22),life:1,maxLife:t,size:1.4+Math.random()*2,color:Math.random()<.55?"#ff8822":"#ffcc44"})}for(let s=this._embers.length-1;s>=0;s--){const t=this._embers[s];t.x+=t.vx*e,t.y+=t.vy*e,t.vx+=(Math.random()-.5)*12*e,t.life-=e/t.maxLife,t.life<=0&&this._embers.splice(s,1)}}_drawEmbers(e){this._embers.forEach(s=>{e.save(),e.globalAlpha=Math.max(0,s.life*.65),e.fillStyle=s.color,e.shadowColor=s.color,e.shadowBlur=7,e.beginPath(),e.arc(s.x,s.y,s.size,0,Math.PI*2),e.fill(),e.restore()})}_drawVignette(e,s,t){const i=s/2,a=t/2,n=e.createRadialGradient(i,a,t*.22,i,a,t*.88);n.addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,0.48)"),e.save(),e.fillStyle=n,e.fillRect(0,0,s,t),e.restore()}_drawTutorialHint(e,s){if(this._tutorialDone)return;if(this._tutorialDelay>0){this._tutorialDelay-=s;return}if(!this.customers.customers.some(g=>g.state!==f.LEAVING_SATISFIED&&g.state!==f.LEAVING_ANGRY&&g.state!=="DINING"&&g.state!==f.DRAGGING))return;const i=this._time;e.save(),e.fillStyle="rgba(0,0,0,0.10)",e.fillRect(0,650,720,560);const a=360,n=1215,h=90,r=630;e.strokeStyle="rgba(255,220,80,0.88)",e.lineWidth=2.5,e.setLineDash([10,7]),e.lineDashOffset=-(i*25),e.beginPath(),e.moveTo(a,n-50),e.quadraticCurveTo(220,(n+r)/2,h,r),e.stroke(),e.setLineDash([]),e.fillStyle="rgba(255,220,80,0.88)",e.beginPath(),e.arc(h,r,8,0,Math.PI*2),e.fill();const d=14+Math.sin(i*3)*4;e.globalAlpha=.45+Math.sin(i*3)*.25,e.strokeStyle="#ffe060",e.lineWidth=2,e.beginPath(),e.arc(h,r,d,0,Math.PI*2),e.stroke(),e.globalAlpha=1;const c=Math.sin(i*3.2)*9;e.font="34px serif",e.textAlign="center",e.textBaseline="middle",e.fillText("👆",a,n-68+c);const p=360,u=890;e.fillStyle="rgba(25,12,0,0.92)",this._roundRect(e,p-168,u-19,336,38,8),e.fill(),e.strokeStyle="#ffaa44",e.lineWidth=1.5,this._roundRect(e,p-168,u-19,336,38,8),e.stroke(),e.fillStyle="#ffe080",e.font="700 13px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText("Drag guests up — or tap a station!",p,u),e.globalAlpha=.55,e.fillStyle="#ffcc88",e.font="11px monospace",e.fillText("Tap anywhere to dismiss",p,u+26),e.restore()}dismissTutorial(){if(!this._tutorialDone){this._tutorialDone=!0;try{localStorage.setItem("mni_tutorial_v1","1")}catch{}}}_updateSpring(e){if(!this.drag.state.dragging){this._dragScale=1,this._dragScaleVel=0;return}const t=-18*(this._dragScale-1.15)-5*this._dragScaleVel;this._dragScaleVel+=t*e,this._dragScale+=this._dragScaleVel*e}_updateFeathers(e){for(let s=this._feathers.length-1;s>=0;s--){const t=this._feathers[s];t.x+=t.vx*e,t.y+=t.vy*e,t.vy+=120*e,t.rot+=t.rotV*e,t.life-=e*1.8,t.life<=0&&this._feathers.splice(s,1)}}_updateShake(e){if(this._shakeTimer>0){this._shakeTimer-=e;const s=this._shakeIntensity;this._shakeX=(Math.random()-.5)*s*2,this._shakeY=(Math.random()-.5)*s*2}else this._shakeX=0,this._shakeY=0}_roundRect(e,s,t,i,a,n){e.beginPath(),e.moveTo(s+n,t),e.lineTo(s+i-n,t),e.arcTo(s+i,t,s+i,t+n,n),e.lineTo(s+i,t+a-n),e.arcTo(s+i,t+a,s+i-n,t+a,n),e.lineTo(s+n,t+a),e.arcTo(s,t+a,s,t+a-n,n),e.lineTo(s,t+n),e.arcTo(s,t,s+n,t,n),e.closePath()}}class ve{constructor(e,s,t){this.gs=s,this.el=e,this.onShopOpen=t,this._inject(),this._update(),this._unsub=s.onChange(()=>this._update())}_inject(){if(!document.getElementById("hud-pixel-styles")){const e=document.createElement("style");e.id="hud-pixel-styles",e.textContent=`
        @font-face {
  font-family: 'DotGothic16';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(./dotgothic16-0.woff2) format('truetype');
}

        #hud {
          font-family: 'DotGothic16', 'Courier New', monospace;
          image-rendering: pixelated;
          -webkit-font-smoothing: none;
          position: relative;
          z-index: 100;
        }

        /* ── Top row: title + coins + stars ── */
        .hud-row1 {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 4px 10px 3px;
          background: linear-gradient(180deg, #2a1200 0%, #1a0900 100%);
          border-bottom: 2px solid #8b3a00;
          height: 44px;
          box-sizing: border-box;
        }

        .hud-title-block {
          display: flex; flex-direction: column; gap: 0;
          flex: 0 0 auto;
          line-height: 1;
        }
        .hud-title-main {
          color: #ff9933;
          font-size: 13px;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(255,120,0,0.7);
          white-space: nowrap;
        }
        .hud-title-sub {
          color: #cc6600;
          font-size: 9px;
          letter-spacing: 0.5px;
          opacity: 0.85;
        }

        .hud-spacer { flex: 1; }

        .hud-coin-pill {
          display: flex; align-items: center; gap: 3px;
          background: rgba(180,100,0,0.25);
          border: 1.5px solid #8b5000;
          padding: 3px 8px;
          margin-right: 6px;
        }
        .hud-coin-icon { font-size: 14px; line-height: 1; }
        .hud-coin-val { color: #ffe060; font-size: 14px; font-weight: 700; min-width: 36px; }

        .hud-stars {
          display: flex; gap: 3px; align-items: center;
        }
        .hud-star {
          width: 18px; height: 18px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 15px; line-height: 1;
          transition: opacity 0.2s;
        }
        .hud-star.dim { opacity: 0.22; filter: grayscale(0.6); }

        /* ── Bottom row: level bar + action buttons ── */
        .hud-row2 {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: #150800;
          border-bottom: 2px solid #5a2000;
          height: 36px;
          box-sizing: border-box;
        }

        .hud-lv-badge {
          flex: 0 0 auto;
          background: #8b2200;
          border: 1.5px solid #cc4400;
          padding: 2px 8px;
          color: #ffe8a0;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .hud-xp-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .hud-xp-track {
          width: 100%; height: 8px;
          background: #1e0800;
          border: 1.5px solid #5a2000;
          overflow: hidden;
          position: relative;
        }
        .hud-xp-fill {
          height: 100%;
          background: linear-gradient(90deg, #cc4400, #ff9900);
          box-shadow: 0 0 6px rgba(255,100,0,0.8);
          transition: width 0.35s ease;
          position: relative;
        }
        .hud-xp-fill::after {
          content: '';
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 3px;
          background: rgba(255,220,100,0.7);
        }
        .hud-xp-txt {
          color: rgba(255,160,80,0.65);
          font-size: 8px;
          text-align: right;
        }

        .hud-action-btns {
          flex: 0 0 auto;
          display: flex; gap: 4px; align-items: center;
        }
        .hud-btn {
          background: #3a1800;
          border: 1.5px solid #8b4400;
          color: #ffcc80;
          font-size: 11px;
          font-family: inherit;
          padding: 3px 8px;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          white-space: nowrap;
          display: flex; align-items: center; gap: 3px;
          height: 26px;
        }
        .hud-btn:active { background: #5a2800; border-color: #cc6600; }
        .hud-btn.primary {
          background: #7a2000;
          border-color: #cc4400;
          color: #ffe0a0;
          box-shadow: 0 0 6px rgba(200,60,0,0.4);
        }
        .hud-btn.primary:active { background: #aa3000; }

        /* ── Level-up toast ── */
        .hud-lup-toast {
          position: absolute; left: 50%; top: 90px;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #cc4400 0%, #ff8800 50%, #ffcc00 100%);
          color: #fff;
          font-size: 18px; font-weight: 900;
          padding: 10px 28px;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
          box-shadow: 0 4px 24px rgba(220,100,0,0.7);
          animation: hud-lup 2.4s ease forwards;
          pointer-events: none; white-space: nowrap;
          font-family: inherit;
          border: 2px solid rgba(255,220,100,0.5);
          z-index: 200;
        }
        .hud-lup-toast.hidden { display: none; }
        @keyframes hud-lup {
          0%   { opacity:0; transform:translateX(-50%) translateY(-16px) scale(0.85); }
          10%  { opacity:1; transform:translateX(-50%) translateY(0) scale(1.05); }
          20%  { transform:translateX(-50%) translateY(0) scale(1); }
          75%  { opacity:1; }
          100% { opacity:0; transform:translateX(-50%) translateY(-24px); }
        }
      `,document.head.appendChild(e)}this.el.innerHTML=`
      <div class="hud-row1">
        <div class="hud-title-block">
          <div class="hud-title-main">&#x1F99C; Mystia's Izakaya</div>
          <div class="hud-title-sub">Night Sparrow Stall</div>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-coin-pill">
          <span class="hud-coin-icon">&#x1FA99;</span>
          <span class="hud-coin-val" id="hud-coins">0</span>
        </div>
        <div class="hud-stars" id="hud-stars"></div>
      </div>

      <div class="hud-row2">
        <div class="hud-lv-badge">Lv.<span id="hud-level">1</span></div>
        <div class="hud-xp-wrap">
          <div class="hud-xp-track">
            <div class="hud-xp-fill" id="hud-xp-fill" style="width:0%"></div>
          </div>
          <div class="hud-xp-txt" id="hud-xp-txt">0/470 XP</div>
        </div>
        <div class="hud-action-btns">
          <button class="hud-btn primary" id="hud-shop-btn" aria-label="Open Sparrow Shop">
            &#x1F99A; Shop
          </button>
        </div>
      </div>

      <div class="hud-lup-toast hidden" id="hud-lup-toast">&#x2728; LEVEL UP! &#x2728;</div>
    `,document.getElementById("hud-shop-btn")?.addEventListener("click",()=>this.onShopOpen?.())}showLevelUp(){const e=document.getElementById("hud-lup-toast");e&&(e.classList.remove("hidden"),e.style.animation="none",requestAnimationFrame(()=>{e.style.animation="",setTimeout(()=>e.classList.add("hidden"),2500)}))}_update(){const e=this.gs,s=document.getElementById("hud-coins");s&&(s.textContent=e.coins.toLocaleString());const t=document.getElementById("hud-level");t&&(t.textContent=e.level);const i=document.getElementById("hud-xp-fill"),a=document.getElementById("hud-xp-txt"),n=e.xpRequired(),h=Math.min(100,e.xp/n*100).toFixed(1);i&&(i.style.width=`${h}%`),a&&(a.textContent=`${e.xp}/${n} XP`);const r=document.getElementById("hud-stars");if(r){const d=Math.floor(e.stars),c=e.stars-d;let p="";for(let u=0;u<l.economy.starMax;u++){const g=u>=d&&!(u===d&&c>.3),S=g?"":u===d?`style="opacity:${(.3+c*.7).toFixed(2)}"`:"";p+=`<span class="hud-star${g?" dim":""}" ${S}>&#x1F3EE;</span>`}r.innerHTML=p}}dispose(){this._unsub?.()}}const we={BBQ:{icon:"&#x1F356;",color:"#c05020",glow:"#ff6622",label:"BBQ Grill"},ODEN:{icon:"&#x1F372;",color:"#7a4090",glow:"#bb66ee",label:"Oden Pot"},STEAM:{icon:"&#x1F962;",color:"#206080",glow:"#44aacc",label:"Steamer"},SAKE:{icon:"&#x1F376;",color:"#901840",glow:"#ee4488",label:"Sake Bar"}},Se={singing:"&#x1F3B5;",tatami:"&#x1F6CC;",tipbox:"&#x1FA99;",autopourer:"&#x1F916;",charcoal:"&#x1F525;"};class Ee{constructor(e,s,t){this.gs=s,this.el=e,this.onClose=t,this._tab="upgrades",this._injectBaseStyles(),this._unsub=s.onChange(()=>{this.el.classList.contains("hidden")||this._render()})}open(){this.el.classList.remove("hidden"),this.el.setAttribute("aria-hidden","false"),this._render()}close(){this.el.classList.add("hidden"),this.el.setAttribute("aria-hidden","true")}_injectBaseStyles(){if(document.getElementById("sparrow-shop-styles"))return;const e=document.createElement("style");e.id="sparrow-shop-styles",e.textContent=`
      #modal { touch-action: manipulation; }

      .ss-backdrop {
        position: absolute; inset: 0;
        background: rgba(0,0,0,0.78);
        display: flex; align-items: flex-end;
        touch-action: manipulation;
      }

      .ss-sheet {
        width: 100%;
        max-height: 82dvh;
        background: #120900;
        border-top: 3px solid #8b3a00;
        border-left: 3px solid #8b3a00;
        border-right: 3px solid #8b3a00;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: max(env(safe-area-inset-bottom, 0px), 12px);
        font-family: 'DotGothic16', 'Courier New', monospace;
        box-shadow: 0 -8px 40px rgba(160,60,0,0.4);
      }

      @keyframes ss-mascot-bob {
        0%,100% { transform: translateY(0) rotate(-2deg); }
        50%      { transform: translateY(-6px) rotate(2deg); }
      }

      /* ── Header ── */
      .ss-hdr {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 16px 10px;
        background: linear-gradient(180deg, #2a1200 0%, #1a0900 100%);
        border-bottom: 2px solid #5a2500;
        flex-shrink: 0;
      }
      .ss-title-row { display: flex; flex-direction: column; gap: 1px; }
      .ss-title {
        font-size: 17px; font-weight: 700; color: #ff9933;
        text-shadow: 0 0 10px rgba(255,120,0,0.5);
        letter-spacing: 1px;
      }
      .ss-coins {
        display: flex; align-items: center; gap: 4px;
        font-size: 12px; color: #ffd060;
      }
      .ss-close {
        background: #3a0800; border: 1.5px solid #8b2200;
        color: #ff9977; width: 32px; height: 32px;
        font-size: 16px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        touch-action: manipulation; -webkit-tap-highlight-color: transparent;
        flex-shrink: 0;
      }
      .ss-close:active { background: #660000; }

      /* ── Tabs ── */
      .ss-tabs {
        display: flex;
        background: #0e0600;
        border-bottom: 2px solid #5a2500;
        flex-shrink: 0;
      }
      .ss-tab {
        flex: 1; padding: 9px 0; font-size: 12px; font-weight: 700;
        color: rgba(180,110,50,0.5);
        background: none; border: none;
        border-bottom: 3px solid transparent;
        cursor: pointer; letter-spacing: 1px;
        font-family: inherit;
        touch-action: manipulation; -webkit-tap-highlight-color: transparent;
        transition: color 0.15s;
      }
      .ss-tab.active {
        color: #ffaa33;
        border-bottom-color: #ff6600;
        background: rgba(255,100,0,0.06);
        text-shadow: 0 0 8px rgba(255,120,0,0.4);
      }

      /* ── Body ── */
      .ss-body {
        flex: 1; overflow-y: auto; padding: 10px 12px 6px;
        -webkit-overflow-scrolling: touch;
      }
      .ss-body::-webkit-scrollbar { width: 3px; }
      .ss-body::-webkit-scrollbar-track { background: transparent; }
      .ss-body::-webkit-scrollbar-thumb { background: #5a2500; }

      /* ── Section labels ── */
      .ss-section-lbl {
        font-size: 9px; color: rgba(200,140,60,0.5);
        text-transform: uppercase; letter-spacing: 2px;
        margin: 8px 0 5px; padding-left: 2px;
        border-left: 2px solid #6a3000;
        padding-left: 6px;
      }

      /* ── Station rows ── */
      .ss-station {
        display: flex; align-items: center; gap: 10px;
        background: rgba(255,200,100,0.04);
        border: 1.5px solid rgba(180,100,30,0.2);
        border-left: 3px solid;
        padding: 8px 10px; margin-bottom: 6px;
      }
      .ss-station-icon {
        font-size: 22px; line-height: 1;
        width: 32px; text-align: center;
        flex-shrink: 0;
      }
      .ss-station-info { flex: 1; min-width: 0; }
      .ss-station-name { font-size: 12px; color: #e0b060; font-weight: 700; }
      .ss-station-sub { font-size: 9px; color: rgba(200,150,80,0.55); margin-top: 1px; }

      /* ── Upgrade cards ── */
      .ss-upg {
        display: flex; align-items: center; gap: 10px;
        background: rgba(255,200,100,0.03);
        border: 1.5px solid rgba(180,100,30,0.2);
        padding: 9px 10px; margin-bottom: 7px;
      }
      .ss-upg-icon {
        font-size: 24px; line-height: 1;
        width: 34px; text-align: center;
        flex-shrink: 0;
        filter: drop-shadow(0 0 4px rgba(255,140,0,0.5));
      }
      .ss-upg-body { flex: 1; min-width: 0; }
      .ss-upg-name { font-size: 12px; color: #e0b060; font-weight: 700; }
      .ss-upg-desc { font-size: 9px; color: rgba(200,150,80,0.55); margin-top: 1px; }
      .ss-upg-effect { font-size: 10px; color: #66dd88; margin-top: 2px; }
      .ss-upg-pips { display: flex; gap: 3px; margin-top: 5px; }
      .ss-pip {
        width: 14px; height: 5px;
        border: 1px solid rgba(180,100,30,0.35);
        background: transparent;
      }
      .ss-pip.on {
        background: #ff6600;
        border-color: #ff8800;
        box-shadow: 0 0 5px rgba(255,100,0,0.7);
      }

      /* ── Action buttons ── */
      .ss-action-btn {
        background: linear-gradient(160deg, #5a1800, #aa4400);
        border: 1.5px solid #cc5500;
        color: #ffe0a0; font-size: 11px; font-weight: 700;
        padding: 7px 10px; cursor: pointer; white-space: nowrap;
        font-family: inherit;
        touch-action: manipulation; -webkit-tap-highlight-color: transparent;
        min-width: 60px; text-align: center;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(180,60,0,0.3);
      }
      .ss-action-btn:active { opacity: 0.8; transform: scale(0.97); }
      .ss-action-btn.owned-s {
        background: rgba(20,80,20,0.4); border-color: #44aa44;
        color: #88ee88; cursor: default; box-shadow: none;
      }
      .ss-action-btn.maxed {
        background: rgba(60,40,0,0.3); border-color: rgba(140,80,20,0.3);
        color: rgba(180,130,60,0.45); cursor: default; box-shadow: none;
      }
      .ss-action-btn.broke {
        background: rgba(30,20,10,0.4); border-color: rgba(120,60,10,0.25);
        color: rgba(180,130,60,0.35); cursor: default; box-shadow: none;
      }

      /* ── Venue cards ── */
      .ss-venue {
        display: flex; gap: 10px; align-items: flex-start;
        background: rgba(255,200,100,0.03);
        border: 1.5px solid rgba(180,100,30,0.2);
        padding: 10px 10px; margin-bottom: 7px;
      }
      .ss-venue.owned-v { border-color: rgba(80,180,60,0.35); background: rgba(40,120,20,0.06); }
      .ss-venue-swatch {
        width: 44px; height: 44px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        border: 1.5px solid rgba(255,200,100,0.15);
      }
      .ss-venue-body { flex: 1; min-width: 0; }
      .ss-venue-name { font-size: 12px; font-weight: 700; color: #ffcc66; margin-bottom: 2px; }
      .ss-venue-desc { font-size: 9px; color: rgba(220,170,90,0.6); }
      .ss-venue-btn-wrap { flex-shrink: 0; display: flex; align-items: center; }
    `,document.head.appendChild(e)}_render(){const e=this.gs,s=["#8b2200","#3a5500","#1a5040","#3a1560","#5a3000"],t=["&#x26E9;","&#x1F3EF;","&#x1F38D;","&#x1F3FA;","&#x2728;"];this.el.innerHTML=`
      <div class="ss-backdrop" id="ss-bd">
        <div class="ss-sheet">

          <div class="ss-hdr">
            <div class="ss-title-row">
              <div class="ss-title">&#x1F99A; Sparrow Shop</div>
              <div class="ss-coins">&#x1FA99; ${e.coins.toLocaleString()} available</div>
            </div>
            <button class="ss-close" id="ss-close">&#x2715;</button>
          </div>

          <div class="ss-tabs">
            <button class="ss-tab ${this._tab==="upgrades"?"active":""}" id="ss-tab-upg">
              &#x2699; UPGRADES
            </button>
            <button class="ss-tab ${this._tab==="venues"?"active":""}" id="ss-tab-ven">
              &#x1F3EE; VENUES
            </button>
          </div>

          <div class="ss-body">
            ${this._tab==="upgrades"?this._renderUpgrades():this._renderVenues(s,t)}
          </div>

        </div>
      </div>
    `,document.getElementById("ss-bd")?.addEventListener("click",i=>{i.target.id==="ss-bd"&&(this.close(),this.onClose?.())}),document.getElementById("ss-close")?.addEventListener("click",()=>{this.close(),this.onClose?.()}),document.getElementById("ss-tab-upg")?.addEventListener("click",()=>{this._tab="upgrades",this._render()}),document.getElementById("ss-tab-ven")?.addEventListener("click",()=>{this._tab="venues",this._render()}),l.seats.forEach(i=>{document.getElementById(`ss-seat-${i.id}`)?.addEventListener("click",()=>e.unlockSeat(i.id))}),Object.keys(l.upgrades).forEach(i=>{document.getElementById(`ss-upg-${i}`)?.addEventListener("click",()=>e.purchaseUpgrade(i))}),Object.keys(l.venues).forEach(i=>{document.getElementById(`ss-ven-${i}`)?.addEventListener("click",()=>e.purchaseVenue(i))})}_renderUpgrades(){const e=this.gs;let s='<div class="ss-section-lbl">Cooking Stations</div>';return l.seats.forEach(t=>{const i=e.seats[t.id],a=we[t.type]||{},n=e.coins>=t.unlockCost,h=i?"owned-s":n?"":"broke";s+=`
        <div class="ss-station" style="border-left-color:${a.glow||"#cc6600"}">
          <span class="ss-station-icon">${a.icon||"&#x1F372;"}</span>
          <div class="ss-station-info">
            <div class="ss-station-name">${t.label}</div>
            <div class="ss-station-sub">${t.description}</div>
          </div>
          <button id="ss-seat-${t.id}"
            class="ss-action-btn ${h}"
            ${i||!i&&!n?"disabled":""}>
            ${i?"&#x2713; Open":`&#165;${t.unlockCost}`}
          </button>
        </div>`}),s+='<div class="ss-section-lbl" style="margin-top:14px">Upgrades</div>',Object.entries(l.upgrades).forEach(([t,i])=>{const a=e.upgradeLevel(t),n=a>=i.maxLevel,h=n?null:i.costs[a],r=!n&&e.coins>=h,d=n?"maxed":r?"":"broke",c=Array.from({length:i.maxLevel},(p,u)=>`<div class="ss-pip ${u<a?"on":""}"></div>`).join("");s+=`
        <div class="ss-upg">
          <span class="ss-upg-icon">${Se[t]||"&#x2B50;"}</span>
          <div class="ss-upg-body">
            <div class="ss-upg-name">${i.name}</div>
            <div class="ss-upg-desc">${i.desc}</div>
            <div class="ss-upg-effect">${i.effectLabel(a)}</div>
            <div class="ss-upg-pips">${c}</div>
          </div>
          <button id="ss-upg-${t}"
            class="ss-action-btn ${d}"
            ${n||!r?"disabled":""}>
            ${n?"MAX":`&#165;${h}`}
          </button>
        </div>`}),s}_renderVenues(e,s){const t=this.gs;let i='<div class="ss-section-lbl">Venue Locations</div>';return Object.entries(l.venues).forEach(([a,n],h)=>{const r=t.venues[a],d=n.cost===0,c=d||t.coins>=n.cost,p=e[h]||"#3a1800",u=s[h]||"&#x1F3EE;",g=r?"owned-s":c?"":"broke";i+=`
        <div class="ss-venue ${r?"owned-v":""}">
          <div class="ss-venue-swatch" style="background:${p}">${u}</div>
          <div class="ss-venue-body">
            <div class="ss-venue-name">${n.name}</div>
            <div class="ss-venue-desc">${n.desc}</div>
          </div>
          <div class="ss-venue-btn-wrap">
            <button id="ss-ven-${a}"
              class="ss-action-btn ${g}"
              ${r||!d&&!c?"disabled":""}>
              ${r?"&#x2713; Active":d?"Default":`&#165;${n.cost}`}
            </button>
          </div>
        </div>`}),i}dispose(){this._unsub?.()}}class ke{constructor(e,{muted:s=!1}={}){this._url=e,this._muted=s,this._audio=null,this._ready=!1,this._fadeIn=1.5,this._init()}_init(){const e=new Audio;e.src=this._url,e.loop=!0,e.preload="auto",e.volume=0,e.addEventListener("canplaythrough",()=>{this._ready=!0,this._muted||this._play()},{once:!0}),setTimeout(()=>{this._ready||(this._ready=!0,this._muted||this._play())},4e3),this._audio=e}_play(){if(!this._audio||this._muted)return;const e=this._audio.play();e!==void 0&&e.catch(()=>{const a=()=>{this._audio.play().catch(()=>{}),document.removeEventListener("pointerdown",a)};document.addEventListener("pointerdown",a,{once:!0})}),this._audio.volume=0;const s=.05,t=.65,i=setInterval(()=>{if(!this._audio||this._muted){clearInterval(i);return}this._audio.volume=Math.min(t,this._audio.volume+s),this._audio.volume>=t&&clearInterval(i)},this._fadeIn*1e3*s/t)}setMuted(e){this._muted=e,this._audio&&(e?(this._audio.pause(),this._audio.volume=0):this._ready&&this._play())}dispose(){this._audio&&(this._audio.pause(),this._audio.src="",this._audio=null)}}const xe=`
@font-face {
  font-family: 'DotGothic16';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(./dotgothic16-0.woff2) format('truetype');
}

#mni-start {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 3, 0, 0.91);
  font-family: 'DotGothic16', 'Courier New', monospace;
  touch-action: manipulation;
  transition: opacity 0.45s ease;
  padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0)
            env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
}

#mni-start.fade-out { opacity: 0; pointer-events: none; }

.mni-s-inner {
  width: min(96vw, 420px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding-top: 48px; /* clear platform top bar */
}

/* ── Lantern row ── */
.mni-s-lanterns {
  display: flex;
  gap: 28px;
  font-size: 28px;
  line-height: 1;
  animation: mni-swing 3.2s ease-in-out infinite;
}
@keyframes mni-swing {
  0%,100% { transform: rotate(-4deg); }
  50%      { transform: rotate(4deg); }
}

/* ── Title card ── */
.mni-s-title-card {
  width: 100%;
  background: linear-gradient(180deg, #1a0800 0%, #0e0500 100%);
  border: 2px solid #8b3a00;
  box-shadow: 0 0 24px rgba(200,80,0,0.35), inset 0 0 12px rgba(0,0,0,0.5);
  padding: 18px 20px 14px;
  text-align: center;
}
.mni-s-title {
  font-size: 22px;
  font-weight: 700;
  color: #ff9933;
  text-shadow: 0 0 14px rgba(255,120,0,0.7), 0 0 30px rgba(255,80,0,0.35);
  line-height: 1.3;
  letter-spacing: 1px;
}
.mni-s-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #cc6600;
  opacity: 0.85;
  letter-spacing: 3px;
}

/* ── Tutorial card ── */
.mni-s-tut {
  width: 100%;
  background: rgba(15, 6, 0, 0.88);
  border: 1.5px solid #5a2500;
  padding: 12px 16px;
}
.mni-s-tut-label {
  font-size: 10px;
  color: #cc6600;
  letter-spacing: 2px;
  margin-bottom: 10px;
  opacity: 0.8;
}
.mni-s-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(90,40,0,0.3);
}
.mni-s-step:last-child { border-bottom: none; }
.mni-s-step-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 28px;
  text-align: center;
  line-height: 1;
}
.mni-s-step-text {
  font-size: 12px;
  color: #ffe0a0;
  line-height: 1.4;
}
.mni-s-step-text strong {
  color: #ffaa44;
}

/* ── Station type guide ── */
.mni-s-types {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.mni-s-type {
  background: rgba(10,4,0,0.75);
  border: 1px solid;
  padding: 5px 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.mni-s-type.bbq   { border-color: #ff6622; color: #ff9966; }
.mni-s-type.locked {
  border-color: #3a2010;
  color: #6a4020;
  opacity: 0.55;
  font-size: 10px;
}

/* ── Start button ── */
.mni-s-btn {
  width: 100%;
  padding: 16px 0;
  background: linear-gradient(180deg, #cc4400 0%, #992200 100%);
  border: 2px solid #ff7733;
  color: #ffe8c0;
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 3px;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 0 20px rgba(200,60,0,0.5);
  animation: mni-pulse 2s ease-in-out infinite;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.mni-s-btn:active {
  background: linear-gradient(180deg, #aa3300 0%, #771800 100%);
  transform: scale(0.97);
}
@keyframes mni-pulse {
  0%,100% { box-shadow: 0 0 20px rgba(200,60,0,0.5); }
  50%      { box-shadow: 0 0 36px rgba(255,100,0,0.8); }
}
`;class Me{constructor(){this._cb=null,this._inject()}_inject(){const e=document.createElement("style");e.textContent=xe,document.head.appendChild(e);const s=document.createElement("div");s.id="mni-start",s.setAttribute("role","dialog"),s.setAttribute("aria-label","Mystia's Night Izakaya — Title Screen"),s.innerHTML=`
      <div class="mni-s-inner">

        <div class="mni-s-lanterns">
          <span>&#x1F3EE;</span>
          <span>&#x1F3EE;</span>
          <span>&#x1F3EE;</span>
          <span>&#x1F3EE;</span>
        </div>

        <div class="mni-s-title-card">
          <div class="mni-s-title">&#x1F99C;&nbsp; Mystia&rsquo;s Night<br>Izakaya</div>
          <div class="mni-s-subtitle">&#12300;&#22812;&#38596;&#12398;&#23450;&#23572;&#12301;</div>
        </div>

        <div class="mni-s-tut">
          <div class="mni-s-tut-label">HOW TO PLAY</div>
          <div class="mni-s-step">
            <span class="mni-s-step-icon">&#x1F6CB;</span>
            <span class="mni-s-step-text">Guests arrive and <strong>wait on the cushions</strong> at the bottom</span>
          </div>
          <div class="mni-s-step">
            <span class="mni-s-step-icon">&#x261D;</span>
            <span class="mni-s-step-text"><strong>Drag a guest up</strong> to the matching station &mdash; or <strong>tap the station</strong> to seat them instantly</span>
          </div>
          <div class="mni-s-step">
            <span class="mni-s-step-icon">&#x1F376;</span>
            <span class="mni-s-step-text"><strong>Tap their table</strong> to refill their drink &mdash; keep the sake flowing!</span>
          </div>
          <div class="mni-s-step">
            <span class="mni-s-step-icon">&#x2B50;</span>
            <span class="mni-s-step-text">Keep <strong>reputation stars</strong> high — angry guests cost stars!</span>
          </div>
        </div>

        <div class="mni-s-types">
          <div class="mni-s-type bbq">&#x1F525; BBQ Grill</div>
          <div class="mni-s-type locked">&#x1F512; Oden Pot</div>
          <div class="mni-s-type locked">&#x1F512; Steamer</div>
          <div class="mni-s-type locked">&#x1F512; Sake Bar</div>
        </div>

        <button class="mni-s-btn" id="mni-start-btn">
          &#x25B6;&nbsp; BEGIN&nbsp;NIGHT
        </button>

      </div>
    `,document.body.appendChild(s),this._el=s,s.querySelector("#mni-start-btn").addEventListener("click",()=>this._start()),s.addEventListener("touchend",t=>{t.target===s&&this._start()})}_start(){this._el.classList.contains("fade-out")||(this._el.classList.add("fade-out"),setTimeout(()=>{this._el.style.display="none",this._cb?.()},460))}onStart(e){this._cb=e}dispose(){this._el?.remove()}}function Ie(o="#stage"){const e=document.querySelector(o);if(!e)throw new Error(`Canvas element "${o}" not found`);if(!(e instanceof HTMLCanvasElement))throw new Error(`Element "${o}" must be a canvas`);const s=e.getContext("2d");if(!s)throw new Error("Unable to acquire 2D rendering context");return{canvas:e,ctx:s}}function Ae(o,{maxDeviceScale:e=2}={}){const s=o.parentElement,t={width:0,height:0,scale:1};function i(){const r=s?.getBoundingClientRect(),d=r?.width||window.innerWidth,c=r?.height||window.innerHeight;return{width:Math.max(1,d),height:Math.max(1,c)}}function a(){const{width:r,height:d}=i();t.scale=Math.min(window.devicePixelRatio||1,e),t.width=r,t.height=d,o.width=Math.ceil(t.width*t.scale),o.height=Math.ceil(t.height*t.scale),o.style.width=`${t.width}px`,o.style.height=`${t.height}px`}const n=s&&typeof ResizeObserver<"u"?new ResizeObserver(a):null;n?.observe(s),window.addEventListener("resize",a),a();function h(){n?.disconnect(),window.removeEventListener("resize",a)}return{viewport:t,resize:a,dispose:h}}function Ce(o,{maxDelta:e=.05}={}){let s=null,t=0,i=!1;function a(r=0){if(!i)return;const d=t?(r-t)/1e3:0,c=Math.min(d,e);t=r,o({timestamp:r,delta:c,elapsed:d}),i&&(s=requestAnimationFrame(a))}function n(){i||(i=!0,t=0,s=requestAnimationFrame(a))}function h(){i=!1,t=0,s!==null&&(cancelAnimationFrame(s),s=null)}return{start:n,stop:h}}const Pe=new URLSearchParams(location.search),Te=Pe.get("muted")==="1",De="./mystias-izakaya-bgm.mp3",z=new ke(De,{muted:!0}),E=document.getElementById("stage"),Le=document.getElementById("hud"),X=document.getElementById("modal");X.setAttribute("aria-hidden","true");const{ctx:Ge}=Ie("#stage"),Re=Ae(E,{maxDeviceScale:2}),{viewport:q}=Re;function $(o,e){const s=E.getBoundingClientRect(),t=q.width/l.design.width;return{x:(o-s.left)/t,y:(e-s.top)/t}}const y=new Q,_=new se(y),v=new ae(y),I=new ne(E,$),A=new re(y),b=new ye(E,Ge,q,y,v,_,I,A);let L=!1;const Ne=new Me;Ne.onStart(()=>{L=!0,z.setMuted(Te)});const Oe=new Ee(X,y,()=>{}),Be=new ve(Le,y,()=>Oe.open());y.onChange(o=>{o==="levelup"&&Be.showLevelUp()});v.onDone((o,e,s)=>{s&&A.rewardSatisfied(o,e)});_.onAngry(o=>{A.penalizeAngry(o)});E.addEventListener("pointerdown",o=>{if(o.preventDefault(),!L)return;E.setPointerCapture(o.pointerId);const e=$(o.clientX,o.clientY);b.dismissTutorial();const s=v.getSeatAtDesignPos(e.x,e.y);if(s){if(!v.isUnlocked(s.id))y.unlockSeat(s.id);else if(s.state==="OCCUPIED")v.tapSeat(s.id)&&b.triggerPour(s.id);else if(s.state==="EMPTY"){const i=_.getFirstWaitingOfType(s.type);i&&v.seatCustomer(s.id,i)&&(_.removeFromQueue(i.id),b.dismissTutorial(),b.triggerPour(s.id))}return}const t=_.getCustomerAtDesignPos(e.x,e.y);if(t){_.startDrag(t.id)&&(I.startDrag(t,o.clientX,o.clientY,o.pointerId),b.onPickup());return}},{passive:!1});E.addEventListener("pointermove",o=>{if(!L||!I.state.dragging){b.hoverSeatId=null;return}const e=$(o.clientX,o.clientY),s=v.getSeatAtDesignPos(e.x,e.y);b.hoverSeatId=s?s.id:null});I.onDrop((o,e,s)=>{b.hoverSeatId=null;const t=v.getSeatAtDesignPos(e,s);if(t){if(!v.isUnlocked(t.id)||t.state!=="EMPTY"){_.cancelDrag(o.id),b.triggerScreenShake(1.5,.1);return}v.seatCustomer(t.id,o)?(_.removeFromQueue(o.id),b.dismissTutorial()):(_.wrongOrder(o.id),A.penalizeWrong(o,e,s),y.changeStars(-.15),b.triggerScreenShake(2,.15))}else _.cancelDrag(o.id)});I.onCancel(o=>{b.hoverSeatId=null,o&&_.cancelDrag(o.id)});window.addEventListener("message",o=>{const e=o.data;if(!(!e||e.type!=="toGodot")&&(e.key==="muted"&&z.setMuted(!0),e.key==="unmuted"&&z.setMuted(!1),e.params?.takeScreenshot))try{o.source?.postMessage({type:"screenshot",data:E.toDataURL("image/png")},"*")}catch{}});let F=0,W=0;const Fe=Ce(({delta:o})=>{L&&(_.update(o),v.update(o),A.update(o),F+=o,F>=1&&(F-=1,y.changeStars(l.economy.starRecoveryRate*y.starRecoveryMult)),W+=o,W>=30&&(W=0,y.save())),b.draw(o)});Fe.start();
