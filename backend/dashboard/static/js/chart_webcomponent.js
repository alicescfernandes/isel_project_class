(()=>{var L=Object.defineProperty;var u=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var w=(s,e,t)=>e in s?L(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,c=(s,e)=>{for(var t in e||(e={}))y.call(e,t)&&w(s,t,e[t]);if(u)for(var t of u(e))f.call(e,t)&&w(s,t,e[t]);return s};var C=(s,e)=>{var t={};for(var r in s)y.call(s,r)&&e.indexOf(r)<0&&(t[r]=s[r]);if(s!=null&&u)for(var r of u(s))e.indexOf(r)<0&&f.call(s,r)&&(t[r]=s[r]);return t};var g=(s,e,t)=>w(s,typeof e!="symbol"?e+"":e,t);var p=(s,e,t)=>new Promise((r,i)=>{var l=a=>{try{o(t.next(a))}catch(h){i(h)}},n=a=>{try{o(t.throw(a))}catch(h){i(h)}},o=a=>a.done?r(a.value):Promise.resolve(a.value).then(l,n);o((t=t.apply(s,e)).next())});var b=`${window.location.origin}/api/`,d=class extends HTMLElement{constructor(){super(),this.initState(),this.chart_id=`chart_${this.state.chartSlug}`}initState(){this.state={chartSlug:this.getAttribute("chart_slug"),quarterNumber:this.getAttribute("q"),isError:!1,isLoading:!0}}static get observedAttributes(){return["chart_slug"]}connectedCallback(){this.setupLazyLoad()}fetchData(){return p(this,null,function*(){let e=new URLSearchParams(c({slug:this.state.chartSlug,q:this.state.quarterNumber},this.state.selectedOption&&{opt:this.state.selectedOption}));try{let r=yield fetch(`${b}chart/?${e.toString()}`);if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);let t=yield r.json(),{selected_option:l}=t,n=C(t,["selected_option"]);this.setState(c({selectedOption:l||""},n))}catch(r){this.setState({isError:!0})}finally{this.setState({isLoading:!1})}})}setState(e){this.state=c(c({},this.state),e),this.render()}renderSpinner(){return`<div class="spinner-container" role="status">
                                <svg aria-hidden="true" class="spinner-svg" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>`}render(){this.state.isLoading&&(this.innerHTML=this.renderSpinner()),this.state.isError&&(this.innerHTML=this.renderError());let e=Array.isArray(this.state.options)&&this.state.options.length>1;this.innerHTML=`
            <div id="${this.chart_id}">
                <div class="chart-header">
                    <h3 class="chart-title"></h3>
                    <div class="chart-quarter-navigation"></div>
                </div>
                ${this.renderZoomOverlay()}
                ${e?`<p>Filter By: <select aria-label="Filter ${this.state.title} Chart" class="chart-filter"></select></p>`:""}
                <div class="chart-container" style="width:100%;height:400px;">
                ${this.renderSpinner()}
                </div>
            </div>`,this.renderQuarterNavigation(),this.renderChart(),e&&this.renderOptions(),this.setupEvents()}waitForPlotly(){return window.isPlotlyLoaded?Promise.resolve():window.isPlotlyLoading?new Promise(e=>{let t=()=>{window.isPlotlyLoaded?e():setTimeout(t,100)};t()}):(window.isPlotlyLoading=!0,import(window.plotlyUrl).then(()=>(window.isPlotlyLoaded=!0,window.isPlotlyLoading=!1,Promise.resolve())))}renderQuarterNavigation(){let e=this.querySelector(`#${this.chart_id} .chart-quarter-navigation`),{quarter:t,title:r}=this.state;e.innerHTML=`
            <button aria-label="Zoom ${r} Chart" class="chart-quarter-nav-btn chart-zoom-btn"><svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/></svg></button>
            <button aria-label="Navigate to Q${t==null?void 0:t.prev}" ${t!=null&&t.prev?"":"disabled"} class="prev-quarter chart-quarter-nav-btn"><svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/></svg></button>
            <button aria-label="Navigate to Q${t==null?void 0:t.next}" ${t!=null&&t.next?"":"disabled"} class="next-quarter chart-quarter-nav-btn"><svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg></button>`}renderZoomOverlay(){return`
            <div class="chart-zoom-overlay">
                <div class="chart-zoom-content">
                    <button class="chart-quarter-nav-btn chart-zoom-close"><svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h4m0 0V5m0 4L4 4m15 5h-4m0 0V5m0 4 5-5M5 15h4m0 0v4m0-4-5 5m15-5h-4m0 0v4m0-4 5 5"/>
</svg>
</button>
                    <div class="chart-zoom-container" style="width:100%; height:100%;"></div>
                </div>
            </div>
        `}renderError(){return`
            <div class="alert-error" role="alert">
            <svg class="alert-error-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-bold">Unable to render chart.</span> Try uploading a new one with the data.
            </div>
            </div>
        `}renderEmptyState(){return`
            <div class="alert-info" role="alert">
                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    The graph doesn't have data to show.
                </div>
            </div>
        `}renderOptions(){let e=this.querySelector(`#${this.chart_id} .chart-filter`);if(!e)return;let{options:t,selectedOption:r}=this.state;e.innerHTML=t.map(i=>`<option value="${i}" ${i===r?"selected":""}>${i}</option>`).join("")}setupEvents(){var e,t,r;(e=this.querySelector(`#${this.chart_id} .chart-filter`))==null||e.addEventListener("change",i=>{this.setState({selectedOption:i.target.value}),this.fetchData()}),(t=this.querySelector(`#${this.chart_id} .prev-quarter`))==null||t.addEventListener("click",()=>this.handleQuarterChange("prev")),(r=this.querySelector(`#${this.chart_id} .next-quarter`))==null||r.addEventListener("click",()=>this.handleQuarterChange("next"))}handleQuarterChange(e){var r;let t=(r=this.state.quarter)==null?void 0:r[e];t&&(this.setState({quarterNumber:t}),this.fetchData())}renderChart(){return p(this,null,function*(){if(!this.isConnected||this.state.isLoading)return;let{title:e,chart_config:t,quarter:r}=this.state,{traces:i,layout:l}=t,n=this.querySelector(`#${this.chart_id} .chart-container`);if(this.querySelector(`#${this.chart_id} .chart-title`).textContent=`${e} - Q${r.current}`,!i.length){n.innerHTML=this.renderEmptyState();return}yield this.waitForPlotly(),n.innerHTML="",Plotly.newPlot(n,i,l,{responsive:!0});let o=this.querySelector(`#${this.chart_id} .chart-zoom-btn`),a=this.querySelector(`#${this.chart_id} .chart-zoom-overlay`),h=this.querySelector(`#${this.chart_id} .chart-zoom-container`),v=this.querySelector(`#${this.chart_id} .chart-zoom-close`);o==null||o.addEventListener("click",()=>{a.style.display="flex",Plotly.newPlot(h,i,l,{responsive:!0})}),v==null||v.addEventListener("click",()=>{a.style.display="none",Plotly.purge(h)}),document.addEventListener("keydown",function(m){(m.key==="Escape"||m.key==="Esc")&&(a.style.display="none",Plotly.purge(h))})})}setupLazyLoad(){new IntersectionObserver((t,r)=>{for(let i of t)i.isIntersecting&&(this.loadChart(),r.unobserve(this))},{root:null,rootMargin:"100px",threshold:.1}).observe(this)}loadChart(){this.state.isLoading&&(this.fetchData(),this.render())}};g(d,"isPlotlyLoaded",!1),g(d,"isPlotlyLoading",!1);customElements.define("plotly-chart",d);})();
//# sourceMappingURL=chart_webcomponent.js.map
