import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons

export default function App() {
  const [data, setData] = useState(null);

  const getQuizzes = async () => {
    try {
      const url = "https://f14a-125-160-96-116.ngrok-free.app/api/quizzes"; // Setiap link ketika ngrok di-run ulang berbeda-beda. Pastikan ketika men-run ulang ngrok perbarui link yang ter-generate.
      const headers = {
        "ngrok-skip-browser-warning": "true",
      };

      const response = await axios.get(url, { headers });

      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const renderQuizItem2 = ({ item }) => {
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
      <View
        style={{
          height: 2,
          backgroundColor: "#21496B",
          marginLeft: 10,
          marginRight: 20,
          marginBottom: 10,
        }}
      ></View>

      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderQuizItem2}
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
    textAlign: "flex-start",
    color: "#98A3CB",
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
