import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import CreateJob from "../pages/CreateJob";
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handleCreateJobClick = () => {
    setShowCreateJobModal(true);
  };

  const linkStyle = {
    color: "#494747",
    textDecoration: "none",
    display: "block",
  };

  const buttonStyle = {
    background: "linear-gradient( #A128FF, #6100AD)",
    color: "white",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "white",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    position: "relative",
  };
  return (
    <div
      style={{
        paddingTop: "1rem",
        width: "100%",
      }}
    >
      <header
        style={{
          backgroundColor: "white",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          color: "black",
          fontWeight: "500",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          borderRadius: "15pc",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <Image
            src="/cyberminds.png"
            alt="CyberMinds Logo"
            width={40}
            height={40}
            priority
            style={{ objectFit: "contain", display: "flex" }}
          />
        </div>

        {isMobile ? (
          <>
            <div
              onClick={() => setSidebarOpen(true)}
              style={{ cursor: "pointer", zIndex: 20 }}
            >
              <div
                style={{
                  width: "25px",
                  height: "3px",
                  backgroundColor: "black",
                  margin: "4px 0",
                  transition: "0.3s",
                }}
              ></div>
              <div
                style={{
                  width: "25px",
                  height: "3px",
                  backgroundColor: "black",
                  margin: "4px 0",
                  transition: "0.3s",
                }}
              ></div>
              <div
                style={{
                  width: "25px",
                  height: "3px",
                  backgroundColor: "black",
                  margin: "4px 0",
                  transition: "0.3s",
                }}
              ></div>
            </div>

            {sidebarOpen && (
              <div
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 9,
                }}
              />
            )}

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "75%",
                backgroundColor: "white",
                color: "black",
                fontWeight: "500",
                padding: "2rem",
                zIndex: 10,
                transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <h2>Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    fontSize: "1rem",
                    background: "none",
                    border: "none",
                    color: "black",
                  }}
                >
                  ✖
                </button>
              </div>
              <Link href="/" style={linkStyle}>
                Home
              </Link>

              <Link href="/find-jobs" style={linkStyle}>
                Find Jobs
              </Link>

              <Link href="/find-talents" style={linkStyle}>
                Find Talents
              </Link>

              <Link href="/about-us" style={linkStyle}>
                About Us
              </Link>

              <Link href="/testimonials" style={linkStyle}>
                Testimonials
              </Link>
              <div style={{ marginTop: "2rem" }}>
                <button style={buttonStyle} onClick={handleCreateJobClick}>
                  Create Jobs
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                flex: "1",
                justifyContent: "center",
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            >
              <Link href="/" style={linkStyle}>
                Home
              </Link>

              <Link href="/find-jobs" style={linkStyle}>
                Find Jobs
              </Link>

              <Link href="/find-talents" style={linkStyle}>
                Find Talents
              </Link>

              <Link href="/about-us" style={linkStyle}>
                About Us
              </Link>

              <Link href="/testimonials" style={linkStyle}>
                Testimonials
              </Link>
            </nav>

            <div style={{ flex: "0 0 auto" }}>
              <button style={buttonStyle} onClick={handleCreateJobClick}>
                Create Jobs
              </button>
            </div>
          </>
        )}
      </header>
      {showCreateJobModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowCreateJobModal(false)}
        >
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <CreateJob onClose={() => setShowCreateJobModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
