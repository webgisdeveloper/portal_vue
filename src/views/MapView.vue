<template>
  <div class="card-body" style="height: 100%;">
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
      <l-layer-group
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
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution, LControlScale, LControlLayers } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'OpenTopoMap',
    visible: false,
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }
];
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
    LControlLayers
  },
  data () {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      center: [35.2059, -97.4457], // Coordinates for University of Oklahoma
      opacity: 0.6,
      token: 'your token if using mapbox',
      mapOptions: { zoomControl: false, attributionControl: false, zoomSnap: true },
      zoom: 13,
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
