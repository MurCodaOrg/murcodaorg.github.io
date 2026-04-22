document.addEventListener('DOMContentLoaded', function() {
  const statusElement = document.getElementById('collection-status');

  function collectClientData() {
    return {
      timestamp: new Date().toISOString(),
      ip: 'Получается отдельно',
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      referrer: document.referrer,
      url: window.location.href
    };
  }

  async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Ошибка получения IP:', error);
      return 'Не удалось определить';
    }
  }

  function parseUserAgent(userAgent) {
    const osMap = {
      'Windows': /Windows/,
      'Mac OS': /Mac/,
      'Linux': /Linux/,
      'Android': /Android/,
      'iOS': /iPhone|iPad|iPod/
    };
    const browserMap = {
      'Chrome': /Chrome/,
      'Firefox': /Firefox/,
      'Safari': /Safari/,
      'Edge': /Edg/,
      'Opera': /Opera/
    };

    let os = 'Неизвестно';
    let browser = 'Неизвестно';

    for (const [name, regex] of Object.entries(osMap)) {
      if (regex.test(userAgent)) {
        os = name;
        break;
      }
    }
    for (const [name, regex] of Object.entries(browserMap)) {
      if (regex.test(userAgent)) {
        browser = name;
        break;
      }
    }

    return { os, browser };
  }

  async function collectAndSendData() {
    statusElement.textContent = 'Собираем данные...';

    const clientData = collectClientData();
    const ip = await getIPAddress();
    const { os, browser } = parseUserAgent(clientData.userAgent);

    const finalData = {
      ...clientData,
      ip: ip,
      os os,
      broser: browser,
      clientId: 'f06033a8bc574126aad9458ede0d2930'
    }

    statusElement.textContent = 'Отправляем в Яндекс Диск...';
  
    await sendToYandexDisk(finalData);
  }

  async function sendToYandexDisk(data) {
    try {
      const token = localStorage.getItem('yandexDiskToken');
      if (!token) {
        throw new Error('Токен для Яндекс Диска не найден');
      }
      
      const uploadLinkResponse = await fetch(
        'https://cloud-api.yandex.net/v1/disk/resources/upload?path=/visitor_data.json&overwrite=true',
        {
          headers: {
            'Authorization': `OAuth ${token}`
          }
        }
      );

      if (!uploadLinkResponse.ok) throw new Error('Не удалось получить ссылку для загрузки');

      const { href: uploadUrl } = await uploadLinkResponse.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: JSON.stringify(data, null, 2),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (uploadResponse.ok) {
        statusElement.textContent = 'Данные успешно отправлены в Яндекс Диск!';
        statusElement.style.color = 'green';
      } else {
        throw new Error('Ошибка отправки данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      statusElement.textContent = 'Ошибка отправки данных в Яндекс Диск';
      statusElement.style.color = 'red';
    }
  }

  collectAndSendData();
});
