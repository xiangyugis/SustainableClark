// JavaScript Document
window.onload = function() {
  mapFunction();
	//alert("loaded")
	console.log("loaded success _(:3」∠)_ ")
};

function mapFunction(){

var map = new L.map('mapid');
map.setView([42.2519,-71.8238],17);


//add basemap to the map
var basemap = L.tileLayer('https://api.mapbox.com/styles/v1/xiangyugis/cki8heuyn364o19obfqlk04bz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieGlhbmd5dWdpcyIsImEiOiJja2ZlaHV0c2QwNTNlMnRuYjRjbTYxeXFtIn0.cGUreWEZThxryiB2ppiCgw', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// add mapbox default basemap
var streetBasemap = L.tileLayer('https://api.mapbox.com/styles/v1/xiangyugis/cki9cl3q24ht419ufsuca8qoh/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieGlhbmd5dWdpcyIsImEiOiJja2ZlaHV0c2QwNTNlMnRuYjRjbTYxeXFtIn0.cGUreWEZThxryiB2ppiCgw', {
	attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>,&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});

map.on('zoomend',function(){
	var z = map.getZoom();
	if(z<14){
		map.removeLayer(basemap);
		map.addLayer(streetBasemap);
		return
	}else{
		map.removeLayer(streetBasemap);
		map.addLayer(basemap);
		return
	}
});
  //set icon size and other info
  var mapIcon = L.Icon.extend({
    options: {
      iconSize: [35, 35],
      iconAnchor: [17, 36], //add the bottom decoration of icon????
      popupAnchor: [0, -28] //get the bottom decoration pop out?????
    }
  });

  //import my icons
  var leedIcon = new mapIcon({
      iconUrl: 'inMapIcon/leed.png'
    }),
    elecCar = new mapIcon({
      iconUrl: 'inMapIcon/elecCar.png'
    }),
    drinkIcon = new mapIcon({
      iconUrl: 'inMapIcon/waterBottle.png'
    }),
    gardenIcon = new mapIcon({
      iconUrl: 'inMapIcon/communityGarden.png'
    });
  zipcarIcon = new mapIcon({
    iconUrl: 'inMapIcon/zipcar1.png'
  });
  heatPlantIcon = new mapIcon({
    iconUrl: 'inMapIcon/HeatPlant.png'
  });
  educationIcon = new mapIcon({
    iconUrl: 'inMapIcon/education.png'
  });

  busIcon = new mapIcon({
    iconUrl: 'inMapIcon/bus.png'
  });
  // zipcarIcon = new mapIcon({
  //   iconUrl: 'inMapIcon/zipcar.png'
  // });


  //feature popup on click

  //standard popup
  function getPopup(feature, layer) {
    //set default vals for pop up content, img, popupDesc and links
    var popupContent = ""
    var popupImg = ""
    var popupDesc = ""
    var popupLink = ""


    if (feature.properties && feature.properties.Label) {
      popupContent += ' <p id="popupLabel">' + feature.properties.Label + '</p>';
    }

    if (feature.properties && feature.properties.Desc) {
      popupDesc += ' <p id="popupDesc">' + feature.properties.Desc + '</p>';
    }

    if (feature.properties && feature.properties.Image) {
      popupImg += ' <img src="' + "Images/" + feature.properties.Image + '"/> '
    }
    if (feature.properties && feature.properties.Link) {
      popupLink = feature.properties.Link
    }

    popupContent += "<table> <tr> <td> " + popupDesc + " </td> <td> " + popupImg + " </td> </tr> </table> ";
    popupContent += popupLink

    layer.bindPopup(popupContent);
  }


  //CALLING NAMES FOR ICON!!!!!!!!!!!!!!!

  //create layers from geoJSONs
  var leedLayer = new L.geoJSON(leedFeature, {
    onEachFeature: getPopup, //Calling the onEachFeature name again????????
    pointToLayer: function (feature, latlng) { //add icon itself to the layer
      return L.marker(latlng, {
        icon: leedIcon
      });
    }
  });

  map.addLayer(leedLayer); //add the created layer as defauly selection

  var evcsLayer = new L.geoJSON(evcsFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: elecCar
      });
    }
  });

  var drinkLayer = new L.geoJSON(drinkFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: drinkIcon
      });
    }
  });


  var gardenLayer = new L.geoJSON(gardenFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: gardenIcon
      });
    }
  });


  var heatPlantLayer = new L.geoJSON(heatPlantFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: heatPlantIcon
      });
    }
  });

  var zipcar1Layer = new L.geoJSON(zipcar1Feature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: zipcarIcon
      });
    }
  });

  var educationLayer = new L.geoJSON(educationFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: educationIcon
      });
    }
  });

  var busLayer = new L.geoJSON(transitFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: busIcon
      });
    }
  });


  //add the filer

  function iconByName(name) {
    return '<i class="icon icon-' + name + '"></i>';
  }

  //add layer filter to map
  var overLayers = [{
      //大标题
      group: "Buildings",
      //小标题，icon，layer唤醒
      layers: [{
          name: "LEED",
          icon: iconByName('leed'),
          layer: leedLayer
        },
      ]
    },
    {
      group: "Education",
      layers: [{
        name: "Sustainability Education",
        icon: iconByName('education'),
        layer: educationLayer
      }]
    },
    {
      group: "Energy",
      layers: [
        {
          name: "Cogeneration Plant",
          icon: iconByName('steam'),
          layer: heatPlantLayer
        },
      ]
    },
    {
      group: "Landscape",
      layers: [{
          name: "Rain Garden",
          icon: iconByName('garden'),
          layer: gardenLayer
        },
      ]
    },
    {
      group: "Transportation",
      layers: [{
          name: "Vehicle Charging",
          icon: iconByName('evcs'),
          layer: evcsLayer
        },
        {
          name: "Bus Stops Near Clark",
          icon: iconByName('bus'),
          layer: busLayer
        },
        {
          name: "Zipcar",
          icon: iconByName('zipcar'),
          layer: zipcar1Layer
        },
      ]
    },
    {
      group: "Water Station",
        layers: [{
            name: "Refillable Water Bottle",
            icon: iconByName('drink'),
            layer: drinkLayer
        },
      ]
    },
  ];

  //add the panel
  var panel = new L.Control.PanelLayers(null, overLayers, {
    collapsibleGroups: true,
    collapsed: false
  });


  //get the panel layer to work
  map.addControl(panel);


}
