import { Button, View, Text, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';

export default function App() {
  
    const styles = StyleSheet.create({
      textbox: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 8
      },
      listItem: {
        padding: 16,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
      },
      listItemText: {
        fontSize: 16,
      },
    });

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Save data to Firestore
    async function saveData() {
        try {
            await db.collection('users').add( {
                name: name,
                email: email,
            });
            alert('Data saved successfully!');
            setName("");
            setEmail("");
            
        } catch (err) {
            alert(`Error adding document: ${err.message}`);
            console.error('Error adding document:', err);
        }
    }
    


    useEffect(() => {

    // Fetching data from the 'users' collection

    db.collection('users')

      .get()

      .then(querySnapshot => {

        setUsers(

          querySnapshot.docs.map(doc => ({

            ...doc.data(),

            id: doc.id,

          }))

        );

      })

      .catch(error => {

        console.error('Error fetching users:', error);

      });

  }, [ name, email]);

    return (
      <ScrollView>
        <View style={{ padding: 20 }}>
          <TextInput
              placeholder="Enter Name"
              style={styles.textbox}
              value={name}
              onChangeText={setName}
          />
          <TextInput
              placeholder="Enter Email"
              style={styles.textbox}
              value={email}
              onChangeText={setEmail}
          />
          <Button title="Save User" onPress={saveData} />
          <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Text style={styles.listItemText}>Name: {item.name}</Text>
                    <Text style={styles.listItemText}>Email: {item.email}</Text>
                </View>
              )}
          />
        </View>
      </ScrollView>
    );
}
