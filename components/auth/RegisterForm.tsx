"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          formData
        ),
      }
    );

    const data =
      await response.json();

    setLoading(false);

    if (data.success) {
      router.push("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-3 rounded-lg"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded-lg"
      >
        {loading
          ? "Loading..."
          : "Create Account"}
      </button>
    </form>
  );
}