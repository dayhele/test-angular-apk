import { ChannelModal } from 'src/app/shared/interfaces/channels-modal';
import { MenuPlan } from 'src/app/shared/interfaces/plan';

export function renderChannelsByPlan(
  containerPath: string,
  planActive: any,
  channels: ChannelModal[]
) {
  const channelsContainer = document.querySelector(containerPath);

  if (channelsContainer) {
    channelsContainer.innerHTML = '';

    channels.forEach((channel) => {
      const channelIsInPlan = planActive.channelsContained.includes(channel.id);

      channelsContainer.innerHTML += `
        <div class="modal--content--channels--image ng-star-inserted">
          <img style="${
            !channelIsInPlan ? 'opacity: 0.2;' : 'opacity: 1;'
          } width: max(65px, 8vw); height: 7vh;" src="${channel.white}" alt="${
        channel.title
      }">
        </div>
      `;
    });
  }
}

export function getActivePlan(plans: MenuPlan[]) {
  return plans.find((plan) => plan.active);
}

export function filterChannelsByPlan(
  plans: MenuPlan[],
  selectedPlanId: number,
  pathContainer: string,
  channels: ChannelModal[]
) {
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
  const ancientPlan = getActivePlan(plans);

  if (ancientPlan && selectedPlan) {
    ancientPlan.active = false;
    selectedPlan.active = true;

    renderChannelsByPlan(pathContainer, selectedPlan, channels);
  }
}
