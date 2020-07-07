import teamMembers from './teamMembers';

class TeamPageBuilder {
  constructor() {
    this.memberMarkup = `
      <div class="team-member__photo">
        <img class="team-member__photo_image" src="" alt="Team member photo">
      </div>
      <div class="team-member__name">
      </div>
      <div class="team-member__description">
        <div class="team-member__description_position">
        </div>
      </div>
      <div class="team-member__social-links">
        <a href="" class="social-link" target="_blank">
          <i class="fa"></i>
        </a>
      </div>
    `;
  }

  init(parentSelector) {
    const parent = document.querySelector(parentSelector);

    const teamPage = document.createDocumentFragment();

    const teamPromoElement = document.createElement('section');
    teamPromoElement.classList.add('team-promo');
    teamPromoElement.innerHTML = `
      <div class="team-promo__title">
        Наша команда
      </div>
    `;
    teamPage.append(teamPromoElement);

    const teamMembersElement = document.createElement('section');
    teamMembersElement.classList.add('team-members');
    const teamMembersFragment = document.createDocumentFragment();
    teamMembers.forEach((member) => {
      teamMembersFragment.append(this.addTeamMember(member));
    });
    teamMembersElement.append(teamMembersFragment);
    teamPage.append(teamMembersElement);

    parent.append(teamPage);
  }

  addTeamMember(options) {
    const teamMember = document.createElement('div');
    teamMember.classList.add('team-member');
    teamMember.innerHTML = this.memberMarkup;

    const {
      name,
      position,
      description,
      image,
      socialLinks
    } = options;

    const nameField = teamMember.querySelector('.team-member__name');
    const positionField = teamMember.querySelector('.team-member__description_position');
    const descriptionField = teamMember.querySelector('.team-member__description');
    const photo = teamMember.querySelector('.team-member__photo_image');
    const socialLinksField = teamMember.querySelector('.team-member__social-links');

    nameField.textContent = name;
    positionField.textContent = position;
    descriptionField.textContent = description;
    photo.setAttribute('src', image);
    socialLinks.forEach((element) => {
      const socialLink = document.createElement('a');
      socialLink.setAttribute('href', element.link);
      socialLink.setAttribute('target', '_blank');
      socialLink.classList.add('social-link');
      socialLink.innerHTML = `<i class="fa ${element.icon}"></i>`;
      socialLinksField.append(socialLink);
    });
     return teamMember;
  }

}

export default new TeamPageBuilder();
