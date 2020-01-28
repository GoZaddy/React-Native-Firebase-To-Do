/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {db} from './src/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
    };

    this.addNewTodo = this.addNewTodo.bind(this);
    this.clearTodos = this.clearTodos.bind(this);
  }

  componentDidMount() {
    db.ref('/todos').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let todoItems = {...data};
      console.log(data);
      this.setState({
        todos: todoItems,
      });
    });
  }

  addNewTodo() {
    db.ref('/todos').push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      presentToDo: '',
    });
  }

  clearTodos() {
    db.ref('/todos').remove();
  }

  render() {
    let todosKeys = Object.keys(this.state.todos);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          {todosKeys.length > 0 ? (
            todosKeys.map(key => (
              <ToDoItem
                key={key}
                id={key}
                todoItem={this.state.todos[key]}
              />
            ))
          ) : (
            <Text>No todo item</Text>
          )}
        </View>

        <TextInput
          placeholder="Add new Todo"
          value={this.state.presentToDo}
          style={styles.textInput}
          onChangeText={e => {
            this.setState({
              presentToDo: e,
            });
          }}
          onSubmitEditing={this.addNewTodo}
        />

        <Button
          title="Add new To do item"
          onPress={this.addNewTodo}
          color="lightgreen"
        />

        <View style={{marginTop: 20}}>
          <Button title="Clear todos" onPress={this.clearTodos} color="red" />
        </View>
      </ScrollView>
    );
  }
}

const ToDoItem = ({todoItem: {todoItem: name, done}, id}) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    db.ref('/todos').update({
      [id]: {
        todoItem: name,
        done: !doneState,
      },
    });
  };
  return (
    <View style={styles.todoItem}>
      <CheckBox
        checkBoxColor="skyblue"
        onClick={onCheck}
        isChecked={doneState}
        disabled={doneState}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
});

export default App;
