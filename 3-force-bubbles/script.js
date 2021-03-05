const margin = {t: 50, r:50, b: 50, l: 50};
const size = {w: 800, h: 800};
const svg = d3.select('svg');

svg.attr('width', size.w)
    .attr('height', size.h);

const containerG = svg.append('g').classed('container', true);

d3.json('data/data.json')
.then(function(data) {
    console.log(data);
    data.nodes.forEach(d => { d.value = 5 + Math.random()*10; });

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    let simulation = d3.forceSimulation(data.nodes)

    let node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(data.nodes)
        .join('circle')
        .attr('yy', d => d.group)
        .attr('r', d => d.value)
        .attr('fill', d => colorScale(d.group))
        .call(drag(simulation));

    simulation.on('tick', () => {
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        });
});


function drag(simulation) {
  
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
  }