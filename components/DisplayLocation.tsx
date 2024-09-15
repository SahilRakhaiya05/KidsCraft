import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DisplayLocation = (props) => {
  const { location } = props;

  return (
    <MapView
      initialRegion={{
        ...location,
        latitudeDelta: 19.076090,
        longitudeDelta: 72.877426,
      }}
      provider="google"
      style={styles.map}
    >
      <Marker coordinate={location} pinColor="#83A2FF" />
    </MapView>
  );
};

export default DisplayLocation;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 250,
  },
});
