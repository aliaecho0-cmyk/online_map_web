import './styles/app.css';
import './styles/motion.css';
import { start } from './router.js';
import { mountStartupIntro } from './components/startup-intro.js';
import { wx } from './adapter/wx.js';
import * as announcementService from './services/announcement.js';

async function showEntryAnnouncement() {
  const { list } = await announcementService.getAnnouncements();
  const announcement = list[0];
  if (!announcement) return;

  wx.showModal({
    title: announcement.title,
    content: announcement.content,
    showCancel: false,
    confirmText: '知道了',
  });
}

const startupIntro = mountStartupIntro();
start();
startupIntro.play().then(showEntryAnnouncement).catch(() => {});
