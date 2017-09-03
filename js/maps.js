var data = {
    "name": "Game of Thrones",
    "children": [{
        "name": "will the north get overrun with the dead? (meaning that the 'final battle' will be closer to king's landing)",
        "children": [{
            "name": "No, they will be stopped a bit after conquering Winterfell"
        }]
    }, {
        "name": "Will the Zombi dragon die?",
        "children": [{
            "name": "I believe the night king will ultimately die, and so will his dragon.",
            "children": [{
                "name": "Viserion is already dead."
            }]
        }]
    }, {
        "name": "Are the white walkers a metaphor for global warming?",
        "children": [{
            "name": "Yes, and melting down the icebergs, delivering a climate disaster maybe forever ('the long night') really drives this point home.."
        }]
    }, {
        "name": "Do you think a white walker dragon will spit ice?",
        "children": [{
            "name": "Although it wasn't clear, the dragon probably spit fire (although a blue on) as the wall melted away."
        }, {
            "name": "Yes. In an 1980 short novel by George R.R Martin called 'The ice dragon', An Ice Dragon fights other dragons, breathing ice. "
        }]
    }, {
        "name": "Will the 'Wall' collapse by the White walkers?",
        "children": [{
            "name" : "The walkers will pass the wall without collapsing it",
            "children" : [{
                "name" : "In season 7 the change in the opening video is to put ice instead of sea at the wall side. This should suggest a possibility to pass the wall without shattering it"
            }]
        },
            {
                "name" : "The Wall is a sort of Chekhov's gun. The ultimate, unreal defence against what ever lies to the north. While the white walkers may find other means of crossing it, shuttering the wall would be too much of a visual treat to be skipped over by the show runners.",
                "children": [{
                    "name": "There is a legend of a giant's horn who can bring the wall down. Mans Raidar was looking for it in the Frost Fingers and failed finding it. It is possible that the night king found it and will use it "
                }]
            }]
    }]
};

// Get main SVG element and width + height attributes
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(40,0)");

// Convert data for a tree layout
var root = d3.hierarchy(data)
var tree = d3.tree()
    .size([height, width - 160]);
tree(root);

// Create links
var link = g.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", function(d) {
        return "M" + d.y + "," + d.x + "C" + (d.y + d.parent.y) / 2 + "," + d.x + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x;
    });

// Create nodes
var node = g.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", function(d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
    })
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
    })

node.append("circle")
    .attr("r", 2.5);

node.append("text")
    .attr("dy", 3)
    .attr("x", function(d) {
        return d.children ? -10 : 10;
    })
    .style("text-anchor", function(d) {
        return d.children ? "end" : "start";
    })
    .text(function(d) {
        return d.data.name
    });