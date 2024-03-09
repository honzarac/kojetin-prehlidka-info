<?php

namespace KjPrehlidka\Model;

class Show {
    public function __construct(
        private string             $showName = '',
        private string|null        $groupName = null,
        private string|null        $time = null,
        private \DateTimeInterface $date = new \DateTimeImmutable(),
        private int|null           $duration = null,
        private string|null        $photoFolder = null,
    )
    {
    }

    public function isFuture(): bool
    {
        return $this->date->format('j') >= (new \DateTime())->format('j');
    }

    public function serialize(): array
    {
        return [
            'showName' => $this->showName,
            'groupName' => $this->groupName,
            'time' => $this->time,
            'date' => $this->date->format('Y-m-d'),
            'length' => $this->duration,
            'photos' => $this->photoFolder ? listPublicImages($this->photoFolder) : []
        ];
    }
}