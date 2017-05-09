
  animations: [
    trigger('popupState', [
      state('active', style({
        visibility: 'visible',
        opacity: 1,
        transform: 'translateX(0)',
      })),
      state('rightInactive', style({
        visibility: 'hidden',
        opacity: 0.8,
        transform: 'translateX(100%)',
      })),
      state('leftInactive', style({
        visibility: 'hidden',
        opacity: 0.8,
        transform: 'translateX(-100%)',
      })),
      transition('leftInactive => active', animate('300ms ease-out')),
      transition('rightInactive => active', animate('300ms ease-out')),
      transition('active => leftInactive', animate('300ms ease-in')),
      transition('active => rightInactive', animate('300ms ease-in'))
    ])
  ]
})