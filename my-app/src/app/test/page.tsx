"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    try {
      console.log("Testing connection to http://localhost:8001/api/auth/register");
      
      const response = await fetch("http://localhost:8001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test",
          email: "test@test.com",
          password: "123456",
          confirmPassword: "123456"
        }),
      });
      
      console.log("Response received:", response);
      setResult(`Status: ${response.status}, OK: ${response.ok}`);
    } catch (error) {
      console.error("Error:", error);
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testSimpleRequest = async () => {
    try {
      console.log("Testing simple fetch to http://localhost:8001");
      
      const response = await fetch("http://localhost:8001");
      console.log("Simple response:", response);
      setResult(`Simple request - Status: ${response.status}`);
    } catch (error) {
      console.error("Simple request error:", error);
      setResult(`Simple Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">API Connection Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testConnection}>Test API Register</Button>
        <Button onClick={testSimpleRequest}>Test Simple Connection</Button>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Result:</strong> {result}
        </div>
      </div>
    </div>
  );
}