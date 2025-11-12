# Computer Networks - Practice Programs Reference Guide

Complete reference for Python socket programming and NS2 network simulation codes.

## Table of Contents

### Python Codes
1. [ARQ Flow Control (Stop-and-Wait)](#1-arq-flow-control-stop-and-wait)
2. [CRC Error Detection](#2-crc-error-detection)
3. [IP Classful Addressing](#3-ip-classful-addressing)
4. [TCP Client-Server](#4-tcp-client-server)
5. [UDP Client-Server](#5-udp-client-server)
6. [Multi-Client Server](#6-multi-client-server)
7. [Subnetting](#7-subnetting)

### NS2 Codes
1. [Bus Topology](#1-bus-topology)
2. [Ring Topology](#2-ring-topology)
3. [Mesh Topology](#3-mesh-topology)
4. [Star Topology](#4-star-topology)
5. [Distance Vector Routing](#5-distance-vector-routing-dsdv)
6. [Link State Routing](#6-link-state-routing)

### Reference Sections
- [NS2 Key Components](#ns2-key-components)
- [Quick Reference](#quick-reference)
- [Important Formulas](#important-formulas)
- [Troubleshooting](#troubleshooting)
- [Tips for Exam/Viva](#tips-for-examviva)

---

## Python Codes

### 1. ARQ Flow Control (Stop-and-Wait)

**Server Code** (`arq_server.py`)
```python
import socket

HOST, PORT = "127.0.0.1", 65432
expected_seq = 0

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((HOST, PORT))
    s.listen(1)
    conn, addr = s.accept()

    with conn:
        while True:
            data = conn.recv(1024).decode()
            if not data:
                break

            msg, seq = data.split("|")

            if int(seq) == expected_seq:
                expected_seq = (expected_seq + 1) % 2

            conn.sendall(f"ACK|{expected_seq}".encode())
```

**Client Code** (`arq_client.py`)
```python
import socket

HOST, PORT = "127.0.0.1", 65432
seq_num = 0

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))

    for packet in ["Hello", "World", "ARQ"]:
        while True:
            s.sendall(f"{packet}|{seq_num}".encode())
            s.settimeout(3)

            try:
                ack = s.recv(1024).decode()
                ack_num = int(ack.split("|")[1])

                if ack_num == (seq_num + 1) % 2:
                    seq_num = (seq_num + 1) % 2
                    break

            except socket.timeout:
                pass
```

**How to Run:**
```bash
# Terminal 1 - Run Server
python3 arq_server.py

# Terminal 2 - Run Client
python3 arq_client.py
```

---

### 2. CRC Error Detection

**Server Code** (`crc_server.py`)
```python
import socket

def xor(a, b):
    result = []
    for i in range(1, len(b)):
        if a[i] == b[i]:
            result.append('0')
        else:
            result.append('1')
    return ''.join(result)

def mod2div(data, key):
    pick = len(key)
    tmp = data[0:pick]

    while pick < len(data):
        if tmp[0] == '1':
            tmp = xor(key, tmp) + data[pick]
        else:
            tmp = xor('0'*pick, tmp) + data[pick]
        pick += 1

    if tmp[0] == '1':
        return xor(key, tmp)
    else:
        return xor('0'*pick, tmp)

HOST, PORT = "127.0.0.1", 65432
KEY = "1001"

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen(1)
    conn, addr = s.accept()

    with conn:
        codeword = conn.recv(4096).decode()
        remainder = mod2div(codeword, KEY)

        if remainder == "0" * (len(KEY) - 1):
            conn.sendall(b"ACK: No error")
        else:
            conn.sendall(b"NACK: Error detected")
```

**Client Code** (`crc_client.py`)
```python
import socket

def xor(a, b):
    result = []
    for i in range(1, len(b)):
        if a[i] == b[i]:
            result.append('0')
        else:
            result.append('1')
    return ''.join(result)

def mod2div(data, key):
    pick = len(key)
    tmp = data[0:pick]

    while pick < len(data):
        if tmp[0] == '1':
            tmp = xor(key, tmp) + data[pick]
        else:
            tmp = xor('0'*pick, tmp) + data[pick]
        pick += 1

    if tmp[0] == '1':
        return xor(key, tmp)
    else:
        return xor('0'*pick, tmp)

def encode(data, key):
    appended = data + '0' * (len(key) - 1)
    remainder = mod2div(appended, key)
    return data + remainder

HOST, PORT = "127.0.0.1", 65432
data = "1101011011"
codeword = encode(data, "1001")

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(codeword.encode())
    response = s.recv(1024).decode()
    print(response)
```

**How to Run:**
```bash
# Terminal 1 - Run Server
python3 crc_server.py

# Terminal 2 - Run Client
python3 crc_client.py
```

---

### 3. IP Classful Addressing

**Code** (`ip_classful.py`)
```python
import ipaddress

def get_network_info(ip_addr):
    first = int(ip_addr.split('.')[0])

    if first <= 126:
        mask = '255.0.0.0'
        cls = 'A'
    elif first <= 191:
        mask = '255.255.0.0'
        cls = 'B'
    else:
        mask = '255.255.255.0'
        cls = 'C'

    net = ipaddress.IPv4Network(f"{ip_addr}/{mask}", strict=False)

    print(f"IP Address: {ip_addr}")
    print(f"Class: {cls}")
    print(f"Mask: {mask}")
    print(f"Network: {net.network_address}")
    print(f"Broadcast: {net.broadcast_address}")
    print(f"Total Hosts: {net.num_addresses - 2}")

ip = input("Enter IP: ")
get_network_info(ip)
```

**How to Run:**
```bash
python3 ip_classful.py
# Enter IP when prompted: 132.6.17.85
```

**Example Output:**
```
Enter IP: 132.6.17.85
IP Address: 132.6.17.85
Class: B
Mask: 255.255.0.0
Network: 132.6.0.0
Broadcast: 132.6.255.255
Total Hosts: 65534
```

---

### 4. TCP Client-Server

**Server Code** (`tcp_server.py`)
```python
import socket

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f"Server listening on {HOST}:{PORT}")

    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        data = conn.recv(1024)

        if data:
            print(f"Received: {data.decode()}")
            conn.sendall(data)
```

**Client Code** (`tcp_client.py`)
```python
import socket

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    message = "Hello TCP"
    s.sendall(message.encode())

    data = s.recv(1024)
    print(f"Received: {data.decode()}")
```

**How to Run:**
```bash
# Terminal 1 - Run Server
python3 tcp_server.py

# Terminal 2 - Run Client
python3 tcp_client.py
```

---

### 5. UDP Client-Server

**Server Code** (`udp_server.py`)
```python
import socket

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print(f"Server listening on {HOST}:{PORT}")

    data, addr = s.recvfrom(1024)
    print(f"Received from {addr}: {data.decode()}")
    s.sendto(data, addr)
```

**Client Code** (`udp_client.py`)
```python
import socket

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    message = "Hello UDP"
    s.sendto(message.encode(), (HOST, PORT))

    data, addr = s.recvfrom(1024)
    print(f"Received: {data.decode()}")
```

**How to Run:**
```bash
# Terminal 1 - Run Server
python3 udp_server.py

# Terminal 2 - Run Client
python3 udp_client.py
```

---

### 6. Multi-Client Server

**Server Code** (`multi_server.py`)
```python
import socket
import threading

def handle_client(conn, addr):
    print(f"Connected: {addr}")
    data = conn.recv(1024)

    if data:
        response = b"Echo: " + data
        conn.sendall(response)

    conn.close()
    print(f"Disconnected: {addr}")

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f"Server listening on {HOST}:{PORT}")

    while True:
        conn, addr = s.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
```

**Client Code** (`multi_client.py`)
```python
import socket
import threading

def client(client_id):
    HOST = '127.0.0.1'
    PORT = 65432

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        message = f"Client {client_id}"
        s.sendall(message.encode())

        data = s.recv(1024)
        print(f"Client {client_id} received: {data.decode()}")

threads = []
for i in range(5):
    t = threading.Thread(target=client, args=(i,))
    t.start()
    threads.append(t)

for t in threads:
    t.join()

print("All clients finished")
```

**How to Run:**
```bash
# Terminal 1 - Run Server
python3 multi_server.py

# Terminal 2 - Run Client (Creates 5 clients)
python3 multi_client.py
```

---

### 7. Subnetting

**Code** (`subnetting.py`)
```python
import ipaddress
import math

cidr = input("Network (e.g., 172.16.0.0/25): ")
blocks = int(input("Number of blocks: "))
hosts = int(input("Hosts per block: "))

net = ipaddress.IPv4Network(cidr, strict=False)
required = hosts + 2
host_bits = math.ceil(math.log2(required))
new_prefix = 32 - host_bits

subnets = list(net.subnets(new_prefix=new_prefix))

if len(subnets) < blocks:
    print("Not enough subnets available")
else:
    for i, subnet in enumerate(subnets[:blocks], 1):
        hosts_list = list(subnet.hosts())

        print(f"\nBlock {i}:")
        print(f"  Network: {subnet.network_address}")
        print(f"  Subnet: {subnet}")
        print(f"  Mask: {subnet.netmask}")
        print(f"  Broadcast: {subnet.broadcast_address}")

        if hosts_list:
            print(f"  First Host: {hosts_list[0]}")
            print(f"  Last Host: {hosts_list[-1]}")
            print(f"  Usable Hosts: {len(hosts_list)}")
```

**How to Run:**
```bash
python3 subnetting.py
# Enter network, blocks, and hosts when prompted
```

**Example Output:**
```
Network (e.g., 172.16.0.0/25): 172.16.0.0/25
Number of blocks: 4
Hosts per block: 30

Block 1:
  Network: 172.16.0.0
  Subnet: 172.16.0.0/27
  Mask: 255.255.255.224
  Broadcast: 172.16.0.31
  First Host: 172.16.0.1
  Last Host: 172.16.0.30
  Usable Hosts: 30
```

---

## NS2 Codes

### 1. Bus Topology

**Code** (`bus.tcl`)
```tcl
set ns [new Simulator]
set nf [open bus.nam w]
$ns namtrace-all $nf

proc finish {} {
    global ns nf
    $ns flush-trace
    close $nf
    exec nam bus.nam &
    exit 0
}

set hub [$ns node]
set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]

$ns duplex-link $n0 $hub 1Mb 10ms DropTail
$ns duplex-link $n1 $hub 1Mb 10ms DropTail
$ns duplex-link $n2 $hub 1Mb 10ms DropTail

set udp0 [new Agent/UDP]
$ns attach-agent $n0 $udp0

set cbr0 [new Application/Traffic/CBR]
$cbr0 attach-agent $udp0
$cbr0 set packetSize_ 512
$cbr0 set rate_ 100Kb

set null [new Agent/Null]
$ns attach-agent $n1 $null
$ns connect $udp0 $null

$ns at 1.0 "$cbr0 start"
$ns at 5.0 "$cbr0 stop"
$ns at 10.0 "finish"

$ns run
```

**How to Run:**
```bash
ns bus.tcl
# NAM window will open automatically
```

---

### 2. Ring Topology

**Code** (`ring.tcl`)
```tcl
set ns [new Simulator]
set nf [open ring.nam w]
$ns namtrace-all $nf

proc finish {} {
    global ns nf
    $ns flush-trace
    close $nf
    exec nam ring.nam &
    exit 0
}

proc create_tcp_connection {src dst} {
    global ns

    set tcp [new Agent/TCP]
    $ns attach-agent $src $tcp

    set sink [new Agent/TCPSink]
    $ns attach-agent $dst $sink

    $ns connect $tcp $sink

    set ftp [new Application/FTP]
    $ftp attach-agent $tcp

    return $ftp
}

set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]
set n4 [$ns node]

$ns duplex-link $n0 $n1 2Mb 10ms FQ
$ns duplex-link $n1 $n2 2Mb 10ms FQ
$ns duplex-link $n2 $n3 2Mb 10ms FQ
$ns duplex-link $n3 $n4 2Mb 10ms FQ
$ns duplex-link $n4 $n0 2Mb 10ms FQ

set ftp1 [create_tcp_connection $n0 $n2]
set ftp2 [create_tcp_connection $n0 $n3]

$ns at 0.5 "$ftp1 start"
$ns at 1.0 "$ftp2 start"
$ns at 5.0 "finish"

$ns run
```

**How to Run:**
```bash
ns ring.tcl
# NAM window will open automatically
```

---

### 3. Mesh Topology

**Code** (`mesh.tcl`)
```tcl
set ns [new Simulator]
set nf [open mesh.nam w]
$ns namtrace-all $nf

proc finish {} {
    global ns nf
    $ns flush-trace
    close $nf
    exec nam mesh.nam &
    exit 0
}

set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]

$ns duplex-link $n0 $n1 1Mb 10ms DropTail
$ns duplex-link $n0 $n2 1Mb 10ms DropTail
$ns duplex-link $n0 $n3 1Mb 10ms DropTail
$ns duplex-link $n1 $n2 1Mb 10ms DropTail
$ns duplex-link $n1 $n3 1Mb 10ms DropTail
$ns duplex-link $n2 $n3 1Mb 10ms DropTail

set tcp0 [new Agent/TCP]
$tcp0 set class_ 1
$ns attach-agent $n1 $tcp0

set sink0 [new Agent/TCPSink]
$ns attach-agent $n3 $sink0
$ns connect $tcp0 $sink0

set cbr0 [new Application/Traffic/CBR]
$cbr0 set packetSize_ 500
$cbr0 set interval_ 0.01
$cbr0 attach-agent $tcp0

$ns at 0.5 "$cbr0 start"
$ns at 4.5 "$cbr0 stop"
$ns at 5.0 "finish"

$ns run
```

**How to Run:**
```bash
ns mesh.tcl
# NAM window will open automatically
```

---

### 4. Star Topology

**Code** (`star.tcl`)
```tcl
set ns [new Simulator]
set nf [open star.nam w]
$ns namtrace-all $nf

proc finish {} {
    global ns nf
    $ns flush-trace
    close $nf
    exec nam star.nam &
    exit 0
}

set hub [$ns node]
set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]
set n4 [$ns node]

$ns duplex-link $n0 $hub 1Mb 10ms DropTail
$ns duplex-link $n1 $hub 1Mb 10ms DropTail
$ns duplex-link $n2 $hub 1Mb 10ms DropTail
$ns duplex-link $n3 $hub 1Mb 10ms DropTail
$ns duplex-link $n4 $hub 1Mb 10ms DropTail

set tcp0 [new Agent/TCP]
$ns attach-agent $n0 $tcp0

set sink0 [new Agent/TCPSink]
$ns attach-agent $n3 $sink0
$ns connect $tcp0 $sink0

set ftp0 [new Application/FTP]
$ftp0 attach-agent $tcp0

$ns at 0.5 "$ftp0 start"
$ns at 4.5 "$ftp0 stop"
$ns at 5.0 "finish"

$ns run
```

**How to Run:**
```bash
ns star.tcl
# NAM window will open automatically
```

---

### 5. Distance Vector Routing (DSDV)

**Code** (`dsdv.tcl`)
```tcl
set ns [new Simulator]
set tracefile [open dsdv_sim.tr w]
$ns trace-all $tracefile

set namfile [open dsdv.nam w]
$ns namtrace-all $namfile

proc finish {} {
    global ns namfile tracefile
    $ns flush-trace
    close $tracefile
    close $namfile
    puts "Simulation finished. Launching NAM..."
    exec nam dsdv.nam &
    exit 0
}

set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]
set n4 [$ns node]

set bw 1Mb
set delay 10ms
set queue DropTail

$ns duplex-link $n0 $n1 $bw $delay $queue
$ns duplex-link $n1 $n2 $bw $delay $queue
$ns duplex-link $n2 $n3 $bw $delay $queue
$ns duplex-link $n3 $n4 $bw $delay $queue

$ns color 1 Blue

set udp [new Agent/UDP]
$ns attach-agent $n0 $udp

set null [new Agent/Null]
$ns attach-agent $n4 $null
$ns connect $udp $null

set cbr [new Application/Traffic/CBR]
$cbr attach-agent $udp
$cbr set packetSize_ 500
$cbr set rate_ 0.1Mb

set start_time 1.0
set stop_time 4.0

$ns at $start_time "$cbr start"
$ns at $stop_time "$cbr stop"
$ns at [expr $stop_time + 1.0] "finish"

puts "Starting simulation. Data transfer scheduled from $start_time s to $stop_time s."
$ns run
```

**How to Run:**
```bash
ns dsdv.tcl
# NAM window will open automatically
```

---

### 6. Link State Routing

**Code** (`linkstate.tcl`)
```tcl
set ns [new Simulator]
set tracefile [open ls_sim.tr w]
$ns trace-all $tracefile

set namfile [open link.nam w]
$ns namtrace-all $namfile

proc finish {} {
    global ns namfile tracefile
    $ns flush-trace
    close $tracefile
    close $namfile
    puts "Simulation finished. Launching NAM..."
    exec nam link.nam &
    exit 0
}

set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]
set n3 [$ns node]
set n4 [$ns node]

set bw 1Mb
set delay 10ms
set queue DropTail

$ns duplex-link $n0 $n1 $bw $delay $queue
$ns duplex-link $n1 $n2 $bw $delay $queue
$ns duplex-link $n2 $n3 $bw $delay $queue
$ns duplex-link $n3 $n4 $bw $delay $queue

$ns color 1 Blue

set udp [new Agent/UDP]
$ns attach-agent $n0 $udp

set null [new Agent/Null]
$ns attach-agent $n4 $null
$ns connect $udp $null

set cbr [new Application/Traffic/CBR]
$cbr attach-agent $udp
$cbr set packetSize_ 500
$cbr set rate_ 0.1Mb

set start_time 1.0
set stop_time 4.0

$ns at $start_time "$cbr start"
$ns at $stop_time "$cbr stop"
$ns at [expr $stop_time + 1.0] "finish"

puts "Starting simulation with Link State Routing. Data transfer scheduled from $start_time s to $stop_time s."
$ns run
```

**How to Run:**
```bash
ns linkstate.tcl
# NAM window will open automatically
```

---

## NS2 Key Components

### Common Elements

- **Simulator**: Creates the network simulation environment
- **Node**: Represents a network device (computer, router, etc.)
- **Duplex-link**: Creates bidirectional connection between nodes
- **Agent**: Represents protocols (TCP, UDP, etc.)
- **Application**: Traffic generators (FTP, CBR, etc.)

### Traffic Types

- **CBR (Constant Bit Rate)**: Sends data at constant rate
- **FTP (File Transfer Protocol)**: Simulates file transfer
- **TCP**: Reliable, connection-oriented protocol
- **UDP**: Unreliable, connectionless protocol

### Queue Types

- **DropTail**: Drops packets when queue is full
- **FQ (Fair Queuing)**: Fair distribution of bandwidth

### Visualization

- **NAM (Network Animator)**: Visual representation of simulation
- **Trace Files**: Records simulation events for analysis

---

## Quick Reference

### Python Socket Programming

```python
# TCP Server Template
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen()
conn, addr = s.accept()

# TCP Client Template
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

# UDP Server Template
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((HOST, PORT))
data, addr = s.recvfrom(1024)

# UDP Client Template
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(data, (HOST, PORT))
```

### NS2 Quick Commands

```tcl
# Create simulator
set ns [new Simulator]

# Create node
set n0 [$ns node]

# Create link
$ns duplex-link $n0 $n1 1Mb 10ms DropTail

# Create agent
set tcp [new Agent/TCP]
$ns attach-agent $n0 $tcp

# Schedule events
$ns at 1.0 "$app start"
$ns at 5.0 "finish"

# Run simulation
$ns run
```

---

## Important Formulas

### Subnetting

- **Number of subnets**: 2^(borrowed bits)
- **Number of hosts per subnet**: 2^(host bits) - 2
- **New subnet mask**: Original + borrowed bits

### IP Classes

- **Class A**: 1-126 (255.0.0.0)
- **Class B**: 128-191 (255.255.0.0)
- **Class C**: 192-223 (255.255.255.0)

### CRC

- **Remainder bits**: Generator polynomial degree - 1
- **Codeword**: Original data + Remainder

---

## Troubleshooting

### Python Issues

**Port already in use:**
```bash
# Find process using port
lsof -i :65432
# Kill process
kill -9 <PID>
```

**Permission denied:**
```bash
# Use port > 1024 or run with sudo (not recommended)
```

### NS2 Issues

**NAM not opening:**
```bash
# Check if NAM is installed
which nam
# Install if missing
sudo apt-get install nam
```

**Trace file errors:**
```bash
# Ensure write permissions
chmod +w .
```

---

## Tips for Exam/Viva

1. **Understand the flow**: Know how data travels from client to server
2. **Key differences**: TCP vs UDP, Distance Vector vs Link State
3. **Error handling**: Know timeout mechanisms in ARQ
4. **Subnetting**: Practice calculating subnet masks manually
5. **NS2 visualization**: Be able to explain NAM output
6. **Socket functions**: Understand bind(), listen(), accept(), connect()
7. **CRC calculation**: Practice XOR operations manually

### Key Concepts to Remember

#### TCP vs UDP
- **TCP**: Connection-oriented, reliable, slower, ordered delivery
- **UDP**: Connectionless, unreliable, faster, no ordering guarantee

#### Distance Vector vs Link State
- **Distance Vector**: Each node shares routing table with neighbors, slower convergence
- **Link State**: Each node shares link information with all nodes, faster convergence

#### Socket States
1. **Server**: socket() → bind() → listen() → accept() → recv()/send() → close()
2. **Client**: socket() → connect() → send()/recv() → close()

#### Common Port Numbers
- HTTP: 80
- HTTPS: 443
- FTP: 21
- SSH: 22
- Telnet: 23
- DNS: 53

---

## Compilation Instructions

### Python Programs
```bash
# No compilation needed - Python is interpreted
python3 program_name.py
```

### NS2 Scripts
```bash
# Run directly with ns command
ns script_name.tcl
```

---

*Master these programs for Computer Networks practical exams! Practice running both server and client sides, understand the flow of data, and be prepared to explain the concepts.*
