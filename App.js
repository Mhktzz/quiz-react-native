import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQuizzes = async () => {
    try {
      const url = "https://53b2-182-2-77-140.ngrok-free.app/api/quizzes";
      const headers = {
        "ngrok-skip-browser-warning": "true",
      };

      const response = await axios.get(url, { headers });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const renderQuizItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.quizContainer}>
          Quiz {item.id}: {item.quiz}
        </Text>

        <TouchableOpacity style={styles.answerBox}>
          <Text style={styles.answerText}>{item.a} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.answerBox}>
          <Text style={styles.answerText}>{item.b} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.answerBox}>
          <Text style={styles.answerText}>{item.c} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.answerBox}>
          <Text style={styles.answerText}>{item.d} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const checkAnswer = (correctAnswer, selectedAnswer) => {
    // Implement your answer checking logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quiz Bank</Text>
      <View style={styles.line} />
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderQuizItem}
        />
      ) : (
        <View
          style={{
            height: "10%",
            backgroundColor: "#FF3752",
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            {" "}
            No Quiz data available
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#252C4A",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
    marginLeft: 10,
    textAlign: "left",
    color: "#98A3CB",
  },

  line: {
    height: 2,
    backgroundColor: "#21496B",
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
  },

  quizContainer: {
    color: "white",
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  answerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 13,
  },
  answerBox: {
    width: "90%",
    height: 50,
    backgroundColor: "#21496B",
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});
