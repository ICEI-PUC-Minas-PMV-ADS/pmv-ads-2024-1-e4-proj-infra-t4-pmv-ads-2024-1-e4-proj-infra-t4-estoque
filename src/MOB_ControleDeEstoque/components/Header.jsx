import React, { useState } from 'react';
import { Appbar, Menu, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const navigateToProfile = () => {
    closeMenu();
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <PaperProvider>
          <View style={styles.content}>
            <Image
              source={require('../assets/ControleDeEstoqueLogo2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Menu
              visible={isMenuVisible}
              onDismiss={closeMenu}
              anchor={<Appbar.Action icon="wrench" color="white" onPress={openMenu} />}
              style={styles.menu}
            >
              <Menu.Item onPress={navigateToProfile} title="Configuração de Perfil" />
            </Menu>
          </View>
        </PaperProvider>
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  header: {
    backgroundColor: '#5871fb',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menu: {
    zIndex: 3,
  },
  logo: {
    width: 200,
    height: 80,
  },
});
