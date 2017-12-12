<script type='text/javascript'>
 $(document).ready(function(){
      draw{{chartId}}()
    });
    function draw{{chartId}}(){  
      var opts = {{{ opts }}},
        data = {{{ data }}}
  
      if(!(opts.type==="pieChart" || opts.type==="sparklinePlus" || opts.type==="bulletChart")) {
        var data = d3.nest()
          .key(function(d){
            //return opts.group === undefined ? 'main' : d[opts.group]
            //instead of main would think a better default is opts.x
            return opts.group === undefined ? opts.y : d[opts.group];
          })
          .entries(data);
      }
      
      if (opts.disabled != undefined){
        data.map(function(d, i){
          d.disabled = opts.disabled[i]
        })
      }
      
      nv.addGraph(function() {
        var chart = nv.models[opts.type]()
          .width(opts.width)
          .height(opts.height)
          
        if (opts.type != "bulletChart"){
          chart
            .x(function(d) { return d[opts.x] })
            .y(function(d) { return d[opts.y] })
        }
          
         
        {{{ chart }}}
          
        {{{ xAxis }}}
        {{{ x2Axis }}}
        
        {{{ yAxis }}}
      
       d3.select("#" + opts.id)
        .append('svg')
        .datum(data)
        .transition().duration(500)
        .call(chart);
       nv.utils.windowResize(chart.update);
       return chart;
      });
    };
</script>
