<?php
require_once '../config/database.php';
require_once '../config/whatsapp.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data received']);
    exit;
}

// Validate data
if (!isset($data['date']) || !isset($data['title']) || !isset($data['description']) || !isset($data['whatsapp'])) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    // Save to database
    $stmt = $pdo->prepare("INSERT INTO events (date, title, description, whatsapp) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['date'],
        $data['title'],
        $data['description'],
        $data['whatsapp']
    ]);

    // Send WhatsApp reminder
    $whatsapp = new WhatsAppService();
    $whatsapp->sendReminder(
        $data['whatsapp'],
        $data['title'],
        $data['date']
    );

    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>