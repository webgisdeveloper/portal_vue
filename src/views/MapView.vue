<!--

This view handles generating the leaflet map using the
vue2-leaflet library  - https://korigan.github.io/Vue2Leaflet

It populates markers from the location object that is populated
from the vuex store (store.js)

-->
<template>
<div id="app" class="container" style="height:100%;width:100%">
  <div class="row" style="height:100%;width:100%">
  <div class="col-md-2">
      <label class="form-check-label">
  <input
    class="form-check-input"
    type="checkbox"
  /> Readers </label>
     
    </div>  
    
  <div class="col-md-9">
      <!-- The map goes here -->
          <l-map ref="map"
      :zoom.sync="zoom"
      :options="mapOptions"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      style="height: 100%">
      <l-control-layers
        :position="layersPosition"
        :collapsed="false"
        :sort-layers="true"
      />
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="token"
        layer-type="base"/>
      <l-control-zoom :position="zoomPosition" />
      <l-control-attribution
        :position="attributionPosition"
        :prefix="attributionPrefix" />
      <l-control-scale :imperial="imperial" />
      <l-marker
        v-for="location in locations"
        :key="location.location_id"
        :lat-lng="[location.latitude, location.longitude]"
        :visible="location.active">
        <l-popup :content="location.name" />
        <l-tooltip :content="location.name" />
      </l-marker>
      <!--
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :lat-lng.sync="marker.position"
        :icon="marker.icon"
        @click="alert(marker)">
        <l-popup :content="marker.tooltip" />
        <l-tooltip :content="marker.tooltip" />
      </l-marker>
      <!--<l-layer-group
        layer-type="overlay"
        name="Layer polyline"
      >
        <l-polyline
          v-for="item in polylines"
          :key="item.id"
          :lat-lngs="item.points"
          :visible="item.visible"
          @click="alert(item)" />
      </l-layer-group>
      <l-layer-group
        v-for="item in stuff"
        :key="item.id"
        :visible="item.visible"
        layer-type="overlay"
        name="Layer 1"
      >
        <l-layer-group :visible="item.markersVisible" >
          <l-marker
            v-for="marker in item.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng="marker.position"
            @click="alert(marker)" />
        </l-layer-group>
        <l-polyline
          :lat-lngs="item.polyline.points"
          :visible="item.polyline.visible"
          @click="alert(item.polyline)" />
      </l-layer-group>
      -->
    </l-map>

    </div>    
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution, LControlScale, LControlLayers } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }];
export default {
  name: 'mapview',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    //LControlLayers
  },
  computed: mapState([
    'locations'
  ]),
  data () {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      center: [35.2059, -97.4457], // Coordinates for University of Oklahoma
      opacity: 0.6,
      token: 'your token if using mapbox',
      mapOptions: { zoomControl: false, attributionControl: false, zoomSnap: true },
      zoom: 10,
      minZoom: 1,
      maxZoom: 20,
      zoomPosition: 'topleft',
      attributionPosition: 'bottomright',
      layersPosition: 'topright',
      attributionPrefix: 'Vue2Leaflet',
      imperial: false,
      Positions: ['topleft', 'topright', 'bottomleft', 'bottomright'],
      tileProviders: tileProviders,
      // bounds: L.latLngBounds({ 'lat': 51.476483373501964, 'lng': -0.14668464136775586 }, { 'lat': 51.52948330894063, 'lng': -0.019140238291583955 })

    }
  },
  mounted () {
    // reference available just after mount so apply after next tick
    this.$nextTick(() => {
       this.map = this.$refs.map.mapObject
    })
    this.getGeoLocation()
  },
  methods: {
    resizeMap () {
      this.map.invalidateSize()
    },
    getGeoLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = [position.coords.latitude, position.coords.longitude]
          // this.map.setView(position)
        })
      }
    }
  }
}
</script>
