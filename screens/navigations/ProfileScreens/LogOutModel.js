import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserContext } from '../../../Context/UserContext';

const LogOutModel = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useContext(UserContext); // Ensure UserContext is properly set up

  // Logout handler
  const handleLogout = async () => {
    try {
      setOpenModal(false); // Close the modal first to prevent UI issues
      if (typeof logout === 'function') {
        await logout(); // Ensure logout is awaited if it's async
      }
      if (typeof props.setIsLoggedIn === 'function') {
        props.setIsLoggedIn(false); // Set login state to false
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <View>
      {/* Logout Button */}
      <View style={styles.logoutLayout} onTouchEnd={() => setOpenModal(true)}>
        <AntDesign name="logout" size={16} color="#838383" />
        <View style={{ marginStart: 10 }}>
          <Text style={styles.textBlue}>Logout</Text>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* <Text style={styles.modalTitle}>Log Out User</Text> */}
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to Logout?</Text>
            </View>
            <View style={styles.modalActions}>
              <Text style={styles.modalButton} onPress={() => setOpenModal(false)}>
                No
              </Text>
              <Text style={styles.modalButton} onPress={handleLogout}>
                Yes
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogOutModel;

const styles = StyleSheet.create({
  logoutLayout: {
    marginStart: 15,
    marginEnd: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlue: {
    fontSize: 14,
    color: '#810055',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    width: '90%',
    borderRadius: 10,
    height: 150,
  },
  modalTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  modalContent: {
    marginVertical: 25,
  },
  modalText: {
    fontSize: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
});
