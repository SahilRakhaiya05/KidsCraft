import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, RefreshControl, ToastAndroid, TouchableOpacity, Text } from 'react-native';
import { useEffect } from 'react';
import SellerProfile from '../components/SellerProfile';
import FAB from '../components/FAB';
import { auth, db, collection, getDocs, doc, deleteDoc } from '../firebase/firebase';
import SellerServiceCard from '../components/SellerServiceCard';
import GeminiChatbot from '../components/GeminiChatbot';

const SellerScreen = () => {
  const [services, setServices] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState<string | undefined>('');
  const [isChatVisible, setIsChatVisible] = useState(false);

  const getServices = async () => {
    setIsLoading(true);
    const servicesArray: any[] = [];

    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      querySnapshot.forEach((doc) => {
        servicesArray.push({ id: doc.id, ...doc.data() });
      });

      setServices(servicesArray);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));

      ToastAndroid.show('Deleted!', ToastAndroid.SHORT);

      getServices();
    } catch (error) {
      ToastAndroid.show('Try Again!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setUserID(auth.currentUser?.uid);
    getServices();
  }, []);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SellerProfile />

        <FlatList
          data={services.filter((item: any) => item.userID === userID)}
          renderItem={({ item }) => (
            <SellerServiceCard {...item} deleteService={deleteService} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 120,
            paddingHorizontal: 15,
          }}
          style={{
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              colors={['#d4a174']}
              onRefresh={getServices}
            />
          }
        />

        <TouchableOpacity style={styles.chatButton} onPress={toggleChatVisibility}>
          <Text style={styles.chatButtonText}>{isChatVisible ? 'Close Chat' : 'Support'}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <FAB />

      <GeminiChatbot isVisible={isChatVisible} onClose={toggleChatVisibility} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    position: 'relative',
  },
  chatButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 40,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SellerScreen;
